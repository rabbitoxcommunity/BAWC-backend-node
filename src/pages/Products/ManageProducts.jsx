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
import { deleteProduct, getProducts } from '../../redux/actionCreator';
import { API_IMAGE_BASE_URL } from '../../config/configuration';

export default function ManageProducts() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [selectedID, setSelectedID] = useState()
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [products, setProducts] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);


  const fetchProducts = (pageNum = 1, limit = perPage, search = "") => {
    setLoading(true);
    dispatch(
      getProducts(
        { page: pageNum, limit: limit, search },
        (res) => {
          setProducts(res?.data || []);
          setPage(res?.pagination?.page || 1);
          setTotalRows(res?.pagination?.total || 0);
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    fetchProducts(1, perPage, debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchProducts(1, perPage);
  }, [perPage]);

  const columns = [
    { name: 'Sl No.', selector: (row, index) => index + 1, sortable: true, width: '90px' },
    { name: 'Product Name', selector: row => row.title, sortable: true, width: '400px' },
    { name: 'Category', selector: row => row.category?.name, sortable: true, width: '100px' },
    { name: 'Brand', selector: row => row.brand?.name, sortable: true, width: '100px' },
    {
      name: 'Price',
      width: "140px",
      cell: (row, index, column, id) => (
        <span>
          {row?.discountPrice ? (
            <>
              AED {row.discountPrice}{" "}
              <span className="price-drop">AED {row.actualPrice}</span>
            </>
          ) : (
            <>AED {row?.actualPrice}</>
          )}
        </span>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Featured Product',
      width: "100px",
      cell: (row, index, column, id) => (
        row?.isFeatured ? <span className='featuredYes'>Yes</span> : <span className='featuredNo'>No</span>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Out of Stock?',
      width: "100px",
      cell: (row, index, column, id) => (
        row?.isOutOfStock ? <span className='featuredNo' style={{ width: "100px" }}>Out of stock</span> : <span style={{ width: "100px" }} className='featuredYes'>InStock</span>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Images',
      width: "150px",
      cell: (row, index, column, id) => (
        <img className='table_img' src={row?.images?.[0]} />
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
            onClick={() => navigate(`/edit-product/${row?._id}`)}
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
    dispatch(deleteProduct({ id: selectedID }, (res) => {
      if (res?.status == 200) {
        setShow(false)
        setSelectedID('')
        fetchProducts()
      }
    }));
  }





  return (
    <Page>
      <Page.Header className={'mb-5'}>
        <Title title={'Manage Products'} />
        <Breadcrumb content={[
          {
            path: '/manage-products',
            name: 'Products'
          },
          {
            path: '/manage-products',
            name: 'Manage Products'
          },
        ]} />
      </Page.Header>

      <Page.Body className={'card'}>
        <h2 className="title mb-4"><span>All Products</span></h2>
        <div className="manage__table">


          <DataTable
            columns={columns}
            data={products}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            paginationDefaultPage={page}
            onChangePage={(pageNum) => fetchProducts(pageNum, perPage)}
            onChangeRowsPerPage={(newPerPage, pageNum) => {
              setPerPage(newPerPage);
              fetchProducts(pageNum, newPerPage);
            }}
            highlightOnHover
            subHeader
            subHeaderComponent={
              <div className="form-group">
                <input
                  type="search"
                  className="form-control !w-[300px]"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
