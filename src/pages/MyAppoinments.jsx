import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const MyAppoinments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(UserContext);

  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const getUserAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment cancelled successfully!");
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error("Failed to cancel appointment!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verifyRazorpayment",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointment");
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to process payment!");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRezorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="mt-20">
      <p className="pb-3 mt-12 font-medium text-teal-700  border-b text-center">
        My Appointments List
      </p>
      {loading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
        <Loader />
      </div>
      ) : (
        <div>
          {appointments.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border"
              key={index}
            >
              <div className="flex items-center">
                <img
                  className="sm:w-32 sm:h-32 w-20 h-20 rounded-full bg-indigo-50 bg-cover object-cover"
                  src={item.docData.image}
                  alt=""
                  onClick={() => navigate(`/doctors`)}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-teal-800 font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-teal-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  Date & Time: {""}
                  <span className="text-xs text-teal-800 font-medium">
                    {""}
                    {item.slotDate} | {item.slotTime}
                  </span>
                </p>
              </div>
              <div></div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 border py-2  rounded text-stone-500 bg-indigo-50">
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentRezorpay(item._id)}
                    className="text-sm text-center sm:min-w-48 py-2 border rounded-xl t bg-teal-700 hover:bg-teal-800 text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-center sm:min-w-48 py-2 border rounded-xl bg-red-700 hover:bg-red-900 text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 border py-2 border-red-500 rounded-xl text-red-500">
                    Appointment Cancelled
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppoinments;
