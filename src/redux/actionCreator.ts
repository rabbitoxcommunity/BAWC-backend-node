// @ts-nocheck

import axios from "axios";
import { updateRedux } from "./commonReducer";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInterceptor";
import { API_BASE_URL } from "../config/configuration";

export function successToast(msg) {
  toast.success(msg, {
    position: "bottom-center",
    autoClose: 3000,
  });
}
export function errorToast(msg) {
  toast.error(msg, {
    position: "bottom-center",
    autoClose: 3000,
  });
}

export const login = (data, callback) => (dispatch) => {
  dispatch(updateRedux({ key: "loginLoader", value: true }));
  axiosInstance
    .post(`${API_BASE_URL}auth/login`, data)
    .then((res) => {
      if (res.status === 200) {
        callback && callback(res);

        const accessToken = res?.data?.token;

        if (accessToken) {
          localStorage.setItem("token", accessToken);
        }
        successToast(res?.data?.message)
      } else {
        errorToast(res?.data?.message)
      }
    })
    .catch((err) => {
      errorToast(err?.response?.data?.message)
      callback && callback(err.response);
    });
};


export const verifyToken = (callback) => (dispatch) => {
  dispatch(updateRedux({ key: "loginLoader", value: true }));
  axiosInstance
    .get(`${API_BASE_URL}auth/admin`,)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      // errorToast(err?.response?.data?.message)
      callback && callback(err.response);
    });
};


export const createCategory = (data, callback) => (dispatch) => {
  axiosInstance
    .post(`${API_BASE_URL}categories`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        dispatch(updateRedux({ key: "newsLists", value: res?.data?.data?.result }));
        console.log(res, 'aslam')
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};

export const updateCategory = (data, callback) => (dispatch) => {
  axiosInstance
    .put(`${API_BASE_URL}categories`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        console.log(res, 'aslam')
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};

export const getCategories = (callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}categories`)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        console.log(res?.data?.data, 'aslam')
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};

export const deleteCategory = (data, callback) => (dispatch) => {
  axiosInstance
    .delete(`${API_BASE_URL}categories`, { data })
    .then((res) => {
      if (res) {
        callback && callback(res);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const getCategoryById = (id, callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}categories/${id}`)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};



// BRANDS

export const createBrand = (data, callback) => (dispatch) => {
  axiosInstance
    .post(`${API_BASE_URL}brands`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const getBrands = (callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}brands`)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const deleteBrand = (data, callback) => (dispatch) => {
  axiosInstance
    .delete(`${API_BASE_URL}brands`, { data })
    .then((res) => {
      if (res) {
        callback && callback(res);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const getBrandById = (id, callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}brands/${id}`)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const updateBrand = (data, callback) => (dispatch) => {
  axiosInstance
    .put(`${API_BASE_URL}brands`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};



// BANNERS


export const createBanner = (data, callback) => (dispatch) => {
  axiosInstance
    .post(`${API_BASE_URL}banners`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const getBanners = (callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}banners`)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const deleteBanner = (data, callback) => (dispatch) => {
  axiosInstance
    .delete(`${API_BASE_URL}banners`, { data })
    .then((res) => {
      if (res) {
        callback && callback(res);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};

export const getBannerById = (id, callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}banners/${id}`)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};

export const updateBanner = (data, callback) => (dispatch) => {
  axiosInstance
    .put(`${API_BASE_URL}banners`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


// PRODUCTS

export const createProduct = (data, callback) => (dispatch) => {
  axiosInstance
    .post(`${API_BASE_URL}products`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};

export const getProducts = (params, callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}products`,{params})
    .then((res) => {
      if (res) {
        callback && callback(res?.data);
        console.log(res?.data,'testtt')
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const deleteProduct = (data, callback) => (dispatch) => {
  axiosInstance
    .delete(`${API_BASE_URL}products`, { data })
    .then((res) => {
      if (res) {
        callback && callback(res);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};


export const getProductById = (id, callback) => (dispatch) => {
  axiosInstance
    .get(`${API_BASE_URL}products/${id}`)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};

export const updateProduct = (data, callback) => (dispatch) => {
  axiosInstance
    .put(`${API_BASE_URL}products`, data)
    .then((res) => {
      if (res) {
        callback && callback(res?.data?.data);
        successToast(res?.data?.message)
      } else {
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    })
    .catch((err) => {
      callback && callback(err?.response?.data?.message);
      toast.error(err?.response?.data?.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }).finally({

    });
};