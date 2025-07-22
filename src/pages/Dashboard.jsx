import { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { DisplayDataUser } from "../Features/DisplayUser";

function Dashboard() {
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const { userData, loading, error } = useSelector(
    (state) => state.DisplayUser
  );
  const cookies = parseCookies();
  const token = cookies.token;
  // console.log(token);

  const handleLogout = () => {
    destroyCookie(null, "token");
    dispatch(DisplayDataUser({ token: null }));
    navigete("/");
  };

  useEffect(() => {
    dispatch(DisplayDataUser({ token }));
    if (!token && error) {
      navigete("/");
    }
  }, [dispatch, token]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#f2f3f8] to-[#e8d0f8]">
      <div className="flex justify-end p-4">
        <button
          className="bg-red-500 text-white px-5 py-3 rounded-md"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>

      <div className="container flex items-center justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1 className="text-3xl font-semibold">Welcome to the Dashboard</h1>
            <p className="mt-4 text-lg">
              {userData
                ? `Hello, ${userData?.name}, Your User Id ${userData?.id}`
                : "Loading profile..."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
