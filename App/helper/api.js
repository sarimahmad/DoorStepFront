import axios from 'axios';
import Server from './Server';

export async function SignUpform(data) {
  var config = {
    method: 'post',
    url: `${Server}/SignUp/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}


export async function LoginForm(data) {
  var config = {
    method: 'post',
    url: `${Server}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function UpdateProfileApi(data,id) {
  var config = {
    method: 'post',
    url: `${Server}/UpdateProfile/${id}/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function ChangePasswordApi(data,id) {
  var config = {
    method: 'post',
    url: `${Server}/ChangePassword/${id}/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function AddProductData(data,token) {
  var config = {
    method: 'post',
    url: `${Server}/product/AddProduct/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization':`Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_All_Product(token) {
  var config = {
    method: 'GET',
    url: `${Server}/product/get_all_Product/`,
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization':`Bearer ${token}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_Seller_Product(token) {
  var config = {
    method: 'GET',
    url: `${Server}/product/Seller_Product/`,
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization':`Bearer ${token}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function PlaceBuyerOrder(data,token) {
  var config = {
    method: 'post',
    url: `${Server}/product/PlaceOrder/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization':`Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}
export async function Get_all_Orders(token) {
  var config = {
    method: 'GET',
    url: `${Server}/product/Get_Orders/`,
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization':`Bearer ${token}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_all_Review(id,token) {
  var config = {
    method: 'GET',
    url: `${Server}/product/Get_Review/${id}`,
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization':`Bearer ${token}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function AddReview(data,token) {
  var config = {
    method: 'post',
    url: `${Server}/product/Add_Review/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization':`Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function ChangeStatus(data) {
  var config = {
    method: 'post',
    url: `${Server}/product/UpdateStatus/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'Authorization':`Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function deleteOrderapi(id,data) {
  var config = {
    method: 'delete',
    url: `${Server}/product/delete_order/${id}/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'Authorization':`Bearer ${token}`,
    },
    data:data
  };
  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function UpdateQuantityApi(id,data) {
  var config = {
    method: 'post',
    url: `${Server}/product/UpdateQuantity/${id}/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'Authorization':`Bearer ${token}`,
    },
    data:data
  };
  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

