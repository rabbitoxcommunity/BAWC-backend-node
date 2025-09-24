import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Page from '../../components/Page/Page';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Title from '../../components/Title/Title';
import { useDispatch } from 'react-redux';
import { createCategory, getCategoryById, updateCategory } from '../../redux/actionCreator';
import { useNavigate, useParams } from 'react-router-dom';
import { API_IMAGE_BASE_URL } from '../../config/configuration';
import { Spinner } from 'react-bootstrap';

export default function AddCategory() {
    const [detail, setDetail] = useState({})
    const [preview, setPreview] = useState(null);
    const [loader, setLoader] = useState(false)

    const { id } = useParams()
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const imageFile = watch("image");

    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);

            // cleanup when unmounted or file changes
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [imageFile]);


    useEffect(() => {
        if (id) {
            dispatch(getCategoryById(id, (res) => {
                setDetail(res);
                reset({
                    name: res?.name || "",
                });
            }));
        } else {
            setDetail({});
            reset({
                name: "",
                image: null,
            });
        }
    }, [id, reset, dispatch]);


    const onSubmit = (data) => {
        setLoader(true)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image[0]);
        if (id) {
            formData.append('id', id);
            dispatch(updateCategory(formData, (res) => {
                if (res) {
                    setLoader(false)
                    navigate('/manage-category')
                }
            }))

        } else {
            dispatch(createCategory(formData, (res) => {
                setLoader(false)
            }))
        }
        reset();
    }
    return (
        <Page>
            <Page.Header className={'mb-5'}>
                <Title title={`${id ? "Edit" : "Add"} Category`} />
                <Breadcrumb content={[
                    {
                        path: '/manage-category',
                        name: 'Category'
                    },
                    {
                        path: '/',
                        name: `${id ? "Edit" : "Add"} Category`
                    },
                ]} />
                {/* <Button className={'btn-primary'} content={'Back'} /> */}
            </Page.Header>

            <Page.Body className={'card'}>
                <h2 className="title mb-4"><span>{`${id ? "Edit" : "Add"} Category`}</span></h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-group">
                            <label htmlFor="">Category Name</label>
                            <input type="text" className="form-control w-100" {...register("name", { required: true })} placeholder='Type here' />
                            {errors?.name && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Category Image</label>
                            <input type="file" className="form-control w-100" {...register("image", { required: !id })} placeholder='Type here' accept='image/*' />
                            {errors?.image && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                            {(preview || detail?.image) && (
                                <img
                                    src={preview || (detail.image)}
                                    alt="Category"
                                    className="mt-2 rounded w-15 h-15 object-contain p-2 bg-gray-100"
                                />
                            )}
                        </div>
                        {/* <div className="col-span-3">
                        <p className='mb-1'>Description</p>
                        <div className="rich__editor">
                            <EditButtons editor={editor} />
                            <EditorContent editor={editor} />
                        </div>
                    </div> */}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button type='submit' className='btn-primary flex items-center gap-2'>{id ? "Update" : "Submit"} {loader && <Spinner size='sm' />}</button>
                        <button onClick={() => navigate('/manage-category')} className='btn-secondary'>Cancel</button>
                    </div>
                </form>
            </Page.Body>
        </Page>
    )
}
