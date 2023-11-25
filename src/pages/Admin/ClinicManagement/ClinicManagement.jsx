import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import { apiAddClinic, apiClinicList, apiDeleteClinic, apiEditClinic, apiServiceList } from '../../../services';
import './ClinicManagement.css';

const ClinicManagement = function () {
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]);

  const [object, setObject] = useState({
    name: '',
    idService: 0,
    clinicNumber: '',
    phoneNumber: '',
    status: 'EMPTY'
  });

  // Hàm để cập nhật một thuộc tính cụ thể của đối tượng
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setObject((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
  };
  const handleServiceSelect = (event) => {
    const selectedIdService = parseInt(event.target.value);
    setObject((prevObject) => ({
      ...prevObject,
      idService: selectedIdService,
    }));
  };

  const handleObjectEdit = (o) => {
    setObject({
      id: o.id,
      idService: o.service.id,
      name: o.name,
      clinicNumber: o.clinicNumber,
      phoneNumber: o.phoneNumber,
      status: o.status,
    })
  }

  const handleAddService = () => {
    if (object.idService == 0) {
      toast.error('Vui lòng chọn khoa!')
    } else {
      const { id, ...addObject } = object;
      console.log(id)
      apiAddClinic(addObject)
        .then((response) => {
          // console.log(response)
          toast.success(response.message);
          setIsSubmitted(true);
        })
        .catch(error => toast.error("Thất bại! " + error));
      closeModal();
    }
  }

  const handleEditService = () => {
    if (object.idService == 0) {
      toast.error('Vui lòng chọn khoa!')
    } else {
      console.log(object)
      const { id, ...updatedObject } = object;
      apiEditClinic(id, updatedObject)
        .then((response) => {
          console.log('response' + response)

          toast.success(response.message);
          setIsSubmitted(true);
        })
        .catch(error => {
          // Xử lý khi có lỗi
          if (error.response) {
            // Nếu response có tồn tại
            console.log('Data from server:', error.response.data);
            console.log('Status code:', error.response.status);
          } else if (error.request) {
            // Nếu request được thực hiện nhưng không nhận được response
            console.log('Request made but no response received');
          } else {
            // Lỗi trong quá trình thiết lập request
            console.log('Error setting up the request:', error.message);
          }
        });
      closeModal();
    }
  }

  const handleDelete = () => {
    apiDeleteClinic(object.id)
      .then(res => {
        toast.success(res.message);
        setIsSubmitted(true);
      })
      .catch(error => toast.error("Thất bại! " + error));
    setOpenDeleteModal(false);
  };

  const fetchData = async () => {
    // API call
    const response = await apiClinicList();
    setData(response.data)
    const serviceList = await apiServiceList();
    setServices(serviceList.data)
  };

  useEffect(() => {
    // just call api only once
    return () => {
      setIsSubmitted(false);
      fetchData();
    };
  }, [isSubmitted]);

  const closeModal = () => {
    setOpenModal(false);
    setOpenAddModal(false);
    setOpenEditModal(false);
  }

  const checkHandleModal = () => {
    if (openAddModal) {
      handleAddService();
    } if (openEditModal) {
      handleEditService();
    }
  }

  return (
    <div className="shadow-2xl rounded-xl mt-12 overflow-hidden">
      <ToastContainer />
      <section className="overflow-hidden py-4" style={{ background: "#6b7280" }}>
        <div className='w-11/12 m-auto justify-center items-center px-3'>
          <div className='my-2 flex-row justify-between items-center'>
            <button onClick={() => { setOpenAddModal(true); setOpenModal(true); }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Add clinic
            </button>
          </div>
        </div>
      </section>

      <section className='table__body'>
        <table className="styled-table">
          <thead>
            <tr>
              <th >
                ID
              </th>
              <th >
                Name
              </th>
              <th >
                ClinicNumber
              </th>
              <th >
                PhoneNumber
              </th>
              <th >
                Khoa
              </th>
              <th >
                Status
              </th>
              <th >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { data.map((d) => (
              <tr key={d.id} className="bg-white">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <a href="#" className="font-bold text-blue-500 hover:underline">
                    {d.id}
                  </a>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {d.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {d.clinicNumber}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {d.phoneNumber}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {d.service.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {d.status}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button onClick={() => { setOpenEditModal(true); setOpenModal(true); handleObjectEdit(d); }} className="py-2 px-2 rounded-lg text-sm font-medium bg-teal-200 text-teal-800 hover:bg-teal-600">Edit</button>
                  <button onClick={() => { setOpenDeleteModal(true); handleObjectEdit(d); }} className="ml-2 py-2 px-2 rounded-lg text-sm font-medium text-white bg-teal-600 hover:bg-teal-200">Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {openModal &&

        <Modal show={openModal} size="md" popup onClose={closeModal} >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{openAddModal && 'Thêm phòng khám'}{openEditModal && 'Sữa thông tin phòng khám'}</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" name='name' required
                  placeholder='Ví dụ: Phòng khám răng hàm mặt'
                  value={object.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="clinicNumber" value="Clinic number" />
                </div>
                <TextInput id="clinicNumber" name='clinicNumber' required
                  placeholder='Ví dụ: 8010'
                  value={object.clinicNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phoneNumber" value="Phone number" />
                </div>
                <TextInput id="phoneNumber" name='phoneNumber' required
                  placeholder='Ví dụ: 0432100200'
                  value={object.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="idService" value="Thuộc khoa" />
                </div>
                <Select
                  id="idService"
                  name="idService"
                  value={object.idService}
                  onChange={handleServiceSelect}
                  required
                >
                  <option value="0">--Please choose an option--</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="status" value="Trạng thái" />
                </div>
                <Select id="status"
                  name='status'
                  value={object.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value='EMPTY'>EMPTY</option>
                  <option value='BOOKING'>BOOKING</option>
                  <option value='MAINTAIN'>MAINTAIN</option>
                </Select>

              </div>
              <div className="flex justify-center gap-56">
                <Button onClick={checkHandleModal} color='success'>{openAddModal && 'Add'}{openEditModal && 'Edit'}</Button>
                <Button color="gray" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }

      {openDeleteModal &&
        <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Bạn có muốn xóa {object.name} ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => handleDelete()}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
};

export default ClinicManagement;
