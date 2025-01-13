import { useContext, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { UserContext } from "../context/UserContext";
import { FaPlus } from "react-icons/fa";
import Loader from "../loader/Loader";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(UserContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("address1", userData.address1);
      formData.append("address2", userData.address2);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      image && formData.append("image", image);
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    userData && (
      <div className="sm:flex justify-center mt-20">
        <div className="max-w-lg flex flex-col gap-2 text-sm border p-4 shadow-xl">
          <div className="sm:flex gap-4 items-center">
            {isEdit ? (
              <label htmlFor="image">
                <div className="flex justify-center cursor-pointer">
                  <div className="relative">
                    <img
                      className="w-36 h-36 bg-cover object-cover rounded-full opacity-75"
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt=""
                    />
                    <FaPlus
                      className="absolute bottom-2 right-2 bg-gray-200 rounded-full"
                      color=""
                      size={35}
                    />
                  </div>
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <div className="flex justify-center">
                <img
                  className="w-36 h-36 rounded-full object-center"
                  src={userData.image}
                  alt=""
                />
              </div>
            )}

            {isEdit ? (
              <input
                className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              <p className="font-medium text-3xl text-teal-600 mt-4">
                {userData.name}
              </p>
            )}
          </div>

          <hr className="bg-zinc-400 h-[1px] border-none" />
          <div className="sm:flex justify-end max-w-lg mt-3 sm:ml-14">
            <div>
              <p className="text-teal-500 underline">CONTACT INFORMATION</p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className="font-medium">Email id:</p>
                <p className="text-blue-500">{userData.email}</p>
                <p className="font-medium">Phone:</p>

                {isEdit ? (
                  <input
                    className="bg-gray-200 focus:outline-teal-400 max-w-52"
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-blue-400">{userData.phone}</p>
                )}

                <p className="font-medium">Address:</p>
                {isEdit ? (
                  <div className="flex flex-col">
                    <input
                      className="bg-gray-200 focus:outline-teal-400"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address1: e.target.value,
                        }))
                      }
                      value={userData?.address1}
                      contentEditable
                      type="text"
                    />
                    <br />
                    <input
                      className="bg-gray-200 focus:outline-teal-400"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address2: e.target.value,
                        }))
                      }
                      value={userData?.address2}
                      type="text"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500">
                    {userData?.address1}
                    <br />
                    {userData?.address2}
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-teal-500 underline">BASIC INFORMATION</p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                <p className="font-medium">Gender:</p>
                {isEdit ? (
                  <select
                    className="max-w-20 bg-gray-100"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender}
                  >
                    <option value="Select Gender">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                ) : (
                  <p className="text-gray-400">{userData.gender}</p>
                )}
                <p className="font-medium">Birthday:</p>
                {isEdit ? (
                  <input
                    className="max-w-28 bg-gray-100"
                    type="date"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                    value={userData.dob}
                  />
                ) : (
                  <p className="text-gray-400">{userData.dob}</p>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="mt-10">
              {isEdit ? (
                <button
                  className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
                  onClick={updateUserProfileData}
                >
                  Save Information
                </button>
              ) : (
                <button
                  className="border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
