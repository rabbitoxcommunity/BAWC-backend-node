import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Page from '../../components/Page/Page';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Title from '../../components/Title/Title';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Edit, Group, Trash2, X } from 'lucide-react';
import { deleteBrand, getBrands } from '../../redux/actionCreator';
import { API_IMAGE_BASE_URL } from '../../config/configuration';

export default function ManageBrands() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [selectedID, setSelectedID] = useState()
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);


  const fetchBrands = () => {
    dispatch(getBrands((res) => {
      setData(res);
      setOriginalData(res);
    }));
  }

  useEffect(() => {
    fetchBrands()
  }, []);

  const columns = [
    { name: 'Sl No.', selector: (row, index) => index + 1, sortable: true, width: '20%' },
    { name: 'Brand Name', selector: row => row.name, sortable: true, width: '20%' },
    {
      name: 'Brand Logo',
      width: "40%",
      cell: (row, index, column, id) => (
        <img className='table_img' src={row?.image} />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Action',
      cell: (row, index, column, id) => (
        <div className='actions'>
          <button
            className="btn-action"
            onClick={() => navigate(`/edit-brand/${row?._id}`)}
            title="Edit"
          >
            <Edit />
          </button>
          <button
            className="btn-action"
            onClick={() => handleDelete(row)}
            title="Delete"
          >
            <Trash2 />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];


  const handleDelete = (row) => {
    setShow(true)
    setSelectedID(row?._id)
  }

  const deleteItem = () => {
    dispatch(deleteBrand({ id: selectedID }, (res) => {
      if (res?.status == 200) {
        setShow(false)
        setSelectedID('')
        fetchBrands()
      }
    }));
  }


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setData(originalData);
    } else {
      const filteredData = originalData.filter(
        (row) =>
          (row.name && row.name.toLowerCase().includes(searchTerm)) ||
          (row.id && row.id.toString().includes(searchTerm)) ||
          (row.age && row.age.toString().includes(searchTerm))
      );
      setData(filteredData);
    }
  };




  return (
    console.log(data,'data'),
    <Page>
      <Page.Header className={'mb-5'}>
        <Title title={'Manage Brands'} />
        <Breadcrumb content={[
          {
            path: '/manage-brand',
            name: 'Brands'
          },
          {
            path: '/manage-brands',
            name: 'Manage Brands'
          },
        ]} />
      </Page.Header>

      <Page.Body className={'card'}>
        <h2 className="title mb-4"><span>All Brands</span></h2>
        <div className="manage__table">
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            subHeader
            subHeaderComponent={
              <div className='form-group'>
                <input
                  type="search"
                  className="form-control !w-[300px]"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
              </div>
            }
          />
        </div>
      </Page.Body>

      <Modal show={show} centered>
        <Modal.Body>
          <div className="modal__body">
            <div className="close" onClick={() => { setShow(false); setSelectedID('') }}><X /></div>
            <h4>Are you sure you want to delete?</h4>
            <div className="footer_btns">
              <button className='btn-secondary' onClick={() => { setShow(false); setSelectedID('') }}>Cancel</button>
              <button className='btn-primary' onClick={deleteItem}>Delete</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Page>
  )
}
