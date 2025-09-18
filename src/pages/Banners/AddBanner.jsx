import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Page from '../../components/Page/Page';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Title from '../../components/Title/Title';
import { useDispatch } from 'react-redux';
import { createBanner, getBannerById, updateBanner } from '../../redux/actionCreator';
import { useNavigate, useParams } from 'react-router-dom';
import { API_IMAGE_BASE_URL } from '../../config/configuration';

export default function AddBanner() {
    const [detail, setDetail] = useState({})
    const [preview, setPreview] = useState(null);

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
            dispatch(getBannerById(id, (res) => {
                setDetail(res);
                reset({
                    subTitle: res?.subTitle || "",
                    mainTitle: res?.mainTitle || "",
                    link: res?.link || "",
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
        const formData = new FormData();
        formData.append('subTitle', data.subTitle);
        formData.append('mainTitle', data.mainTitle);
        formData.append('link', data.link);
        formData.append('image', data.image[0]);
        if (id) {
            formData.append('id', id);
            dispatch(updateBanner(formData))
            navigate('/manage-banners')
        } else {
            dispatch(createBanner(formData))
        }
        reset();
    }
    return (
        <Page>
            <Page.Header className={'mb-5'}>
                <Title title={`${id ? "Edit" : "Add"} Banner`} />
                <Breadcrumb content={[
                    {
                        path: '/manage-Banners',
                        name: 'Banner'
                    },
                    {
                        path: '/',
                        name: `${id ? "Edit" : "Add"} Banner`
                    },
                ]} />
                {/* <Button className={'btn-primary'} content={'Back'} /> */}
            </Page.Header>

            <Page.Body className={'card'}>
                <h2 className="title mb-4"><span>{`${id ? "Edit" : "Add"} Banner`}</span></h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="form-group">
                            <label htmlFor="">Sub Title</label>
                            <input type="text" className="form-control w-100" {...register("subTitle")} placeholder='Type here' />
                        </div>
                         <div className="form-group col-span-2">
                            <label htmlFor="">Main Title</label>
                            <input type="text" className="form-control w-100" {...register("mainTitle")} placeholder='Type here' />
                        </div>
                         <div className="form-group col-span-2">
                            <label htmlFor="">Link</label>
                            <input type="text" className="form-control w-100" {...register("link")} placeholder='Type here' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Banner Image</label>
                            <input type="file" className="form-control w-100" {...register("image", { required: !id })} placeholder='Type here' accept='image/*' />
                            {errors?.image && <span style={{ color: "red", fontSize: "12px" }}>This is required</span>}
                            {(preview || detail?.image) && (
                                <img
                                    src={preview || (API_IMAGE_BASE_URL + detail.image)}
                                    alt="Brand"
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
                        <button type='submit' className='btn-primary'>{id ? "Update" : "Submit"}</button>
                        <button onClick={() => navigate('/manage-brand')} className='btn-secondary'>Cancel</button>
                    </div>
                </form>
            </Page.Body>
        </Page>
    )
}
