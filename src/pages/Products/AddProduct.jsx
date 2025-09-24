import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import Page from '../../components/Page/Page';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Title from '../../components/Title/Title';
import { useDispatch } from 'react-redux';
import { createProduct, getBrands, getCategories, getProductById, updateProduct } from '../../redux/actionCreator';
import { useNavigate, useParams } from 'react-router-dom';
import { API_IMAGE_BASE_URL } from '../../config/configuration';
import Select from "react-select";
import { Form, Spinner } from 'react-bootstrap';
import { EditButtons } from '../../components/Editor/EditButtons';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';

export default function AddProduct() {
    const [detail, setDetail] = useState({})
    const [previews, setPreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [loader, setLoader] = useState(false)

    const { id } = useParams()
    const { register, handleSubmit, reset, watch, control, formState: { errors } } = useForm({
        defaultValues: {
            isFeatured: false,
            isOutOfStock: false,
            actualPrice: "",
            discountPrice: "",
            title: "",
            category: null,
            brand: null,
            description: "",
            images: [],
        },
    });

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchCategories = () => {
        dispatch(getCategories((res) => {
            setCategories(res);
        }));
    }

    const fetchBrands = () => {
        dispatch(getBrands((res) => {
            setBrands(res);
        }));
    }

    useEffect(() => {
        fetchCategories()
        fetchBrands()
    }, [])

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2] },
                bulletList: {},
                orderedList: {},
            }),
            Placeholder.configure({
                placeholder: "Enter product description",
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: "",
    });

    const imageFile = watch("images");

    // ✅ Deduplicate new image files when selected
    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const filesArray = Array.from(imageFile);

            // remove duplicates by name+size
            const uniqueFiles = Array.from(
                new Map(filesArray.map(f => [f.name + f.size, f])).values()
            );

            const objectUrls = uniqueFiles.map(file => URL.createObjectURL(file));

            setPreviews(objectUrls);
            setNewFiles(uniqueFiles); // only unique files

            return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
        } else {
            setPreviews([]);
            setNewFiles([]);
        }
    }, [imageFile]);

    const removeNewImage = (index) => {
        setPreviews(previews.filter((_, i) => i !== index));
        setNewFiles(newFiles.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (id) {
            dispatch(getProductById(id, (res) => {
                setDetail(res);
                reset({
                    title: res?.title || "",
                    category: res?.category
                        ? { value: res?.category?._id, label: res?.category?.name }
                        : null,
                    brand: res?.brand
                        ? { value: res?.brand?._id, label: res?.brand?.name }
                        : null,
                    isFeatured: res?.isFeatured,
                    actualPrice: res?.actualPrice,
                    discountPrice: res?.discountPrice,
                    isOutOfStock: res?.isOutOfStock,
                    description: res?.description,
                });
            }));
        } else {
            setDetail({});
            reset({
                isFeatured: false,
                isOutOfStock: false,
                actualPrice: "",
                discountPrice: "",
                title: "",
                category: null,
                brand: null,
                description: "",
                images: [],
            });
        }
    }, [id, reset, dispatch]);

    // initialize images from detail
    useEffect(() => {
        if (detail?.images) {
            setOldImages(detail.images);
        }
    }, [detail]);

    const handleRemove = (index) => {
        const updatedImages = oldImages.filter((_, i) => i !== index);
        setOldImages(updatedImages);
    };

    const onSubmit = (data) => {
        console.log(data,'data')
        setLoader(true)
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category', data?.category?.value);
        formData.append('brand', data?.brand?.value);
        formData.append('actualPrice', data?.actualPrice);
        formData.append('discountPrice', data?.discountPrice ? data?.discountPrice : 0);
        formData.append('isFeatured', data?.isFeatured);
        formData.append('isOutOfStock', data?.isOutOfStock);

        // ✅ Deduplicate old images
        if (oldImages.length > 0) {
            const uniqueOldImages = Array.from(new Set(oldImages));
            formData.append('imagesToKeep', JSON.stringify(uniqueOldImages));
        }

        // ✅ Deduplicate new files
        if (newFiles.length > 0) {
            const uniqueNewFiles = Array.from(
                new Map(newFiles.map(f => [f.name + f.size, f])).values()
            );
            uniqueNewFiles.forEach((file) => {
                formData.append("images", file);
            });
        }

        formData.append("description", data?.description);

        if (id) {
            formData.append('id', id);
            dispatch(updateProduct(formData, (res) => {
                if (res) {
                     setLoader(false)
                    navigate('/manage-products');
                }
            }));

        } else {
            dispatch(createProduct(formData,(res)=>{
                  if (res) {
                     setLoader(false)
                }
            }));
        }

        reset({
            isFeatured: false,
            isOutOfStock: false,
            actualPrice: "",
            discountPrice: "",
            title: "",
            category: null,
            brand: null,
            description: "",
            images: [],
        });
        if (editor) {
            editor.commands.setContent("");
        }
    }

    return (
        <Page>
            <Page.Header className={'mb-5'}>
                <Title title={`${id ? "Edit" : "Add"} Product`} />
                <Breadcrumb content={[
                    { path: '/manage-products', name: 'Products' },
                    { path: '/', name: `${id ? "Edit" : "Add"} Product` },
                ]} />
            </Page.Header>

            <Page.Body className={'card'}>
                <h2 className="title mb-4"><span>{`${id ? "Edit" : "Add"} Product`}</span></h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-group col-span-3">
                            <label>Product Name</label>
                            <input type="text" className="form-control w-100"
                                {...register("title", { required: true })}
                                placeholder='Type here'
                            />
                            {errors?.title && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Select Category</label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={categories.map(c => ({ value: c._id, label: c.name }))}
                                        placeholder="Choose..."
                                        onChange={(val) => field.onChange(val)}
                                    />
                                )}
                            />
                            {errors?.category && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Select Brand</label>
                            <Controller
                                name="brand"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={brands.map(b => ({ value: b._id, label: b.name }))}
                                        placeholder="Choose..."
                                        onChange={(val) => field.onChange(val)}
                                    />
                                )}
                            />
                            {errors?.brand && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Is Featured?</label>
                            <Controller
                                name="isFeatured"
                                control={control}
                                render={({ field }) => (
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                        <Form.Check
                                            type="switch"
                                            id="featured-switch"
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                        <span>{field.value ? "Yes" : "No"}</span>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <label>Actual Price (MRP)</label>
                            <input
                                type="number"
                                className="form-control w-100"
                                {...register("actualPrice", { required: "Actual price is required" })}
                                placeholder="Type here"
                            />
                            {errors?.actualPrice && <span style={{ color: "red", fontSize: "12px" }}>{errors.actualPrice.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Discount Price</label>
                            <input
                                type="number"
                                className="form-control w-100"
                                {...register("discountPrice", {
                                    validate: (value, formValues) => {
                                        if (!value) return true;
                                        return (
                                            Number(value) < Number(formValues.actualPrice) ||
                                            "Discount price must be less than actual price"
                                        );
                                    },
                                })}
                                placeholder="Type here"
                            />
                            {errors?.discountPrice && <span style={{ color: "red", fontSize: "12px" }}>{errors.discountPrice.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>Out of Stock?</label>
                            <Controller
                                name="isOutOfStock"
                                control={control}
                                render={({ field }) => (
                                    <div className="d-flex align-items-center gap-2 mt-2">
                                        <Form.Check
                                            type="switch"
                                            id="stock-switch"
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                        />
                                        <span>{field.value ? "Yes" : "No"}</span>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <label>Product Images (Multiple)</label>
                            <input
                                type="file"
                                className="form-control w-100"
                                accept="image/jpeg, image/png, image/webp"
                                multiple
                                {...register("images", {
                                    required: !id,
                                    validate: {
                                        maxFiles: (files) => files.length <= 7 || "You can only upload up to 7 images",
                                    },
                                })}
                            />
                            {errors?.images && (
                                <span style={{ color: "red", fontSize: "12px" }}>
                                    {errors.images.message || "This is required"}
                                </span>
                            )}
                        </div>
                        <div className="col-span-3">
                            {(previews?.length > 0 || oldImages?.length > 0) && (
                                <div className="flex gap-2 flex-wrap mt-2">
                                    {/* new previews */}
                                    {previews.map((src, index) => (
                                        <div key={`preview-${index}`} className="relative">
                                            <img src={src} alt={`preview-${index}`} className="rounded w-20 h-20 object-contain p-2 bg-gray-100" />
                                            <button type="button" onClick={() => removeNewImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs flex items-center justify-center w-[20px] h-[20px] rounded-full">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    {/* old images */}
                                    {oldImages?.map((img, index) => (
                                        <div key={`detail-${index}`} className="relative">
                                            <img src={img} alt={`detail-${index}`} className="rounded w-20 h-20 object-contain p-2 bg-gray-100" />
                                            <button type="button" onClick={() => handleRemove(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white text-xs flex items-center justify-center w-[20px] h-[20px] rounded-full">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="col-span-3">
                            <p className='mb-1'>Product Description</p>
                            <div className="rich__editor">
                                <EditButtons editor={editor} />
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        useEffect(() => {
                                            if (!editor) return;
                                            if (field.value && editor.isEmpty) {
                                                editor.commands.setContent(field.value);
                                            }
                                            editor.on("update", () => {
                                                field.onChange(editor.getHTML());
                                            });
                                        }, [editor, field.value]);
                                        return <EditorContent editor={editor} />;
                                    }}
                                />
                            </div>
                            {errors?.description && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                        </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                        {/* <button type='submit' className='btn-primary'>{id ? "Update" : "Submit"}</button> */}
                        <button type='submit' className='btn-primary flex items-center gap-2'>{id ? "Update" : "Submit"} {loader && <Spinner size='sm' />}</button>
                        <button onClick={() => navigate('/manage-category')} className='btn-secondary'>Cancel</button>
                    </div>
                </form>
            </Page.Body>
        </Page>
    )
}
