import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_BACKEND_API } from "@/utils/constants";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userImage = user?.profile?.profilePhoto;

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_BACKEND_API}/logout`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="bg-black">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-gray-400">
            Get<span className=" text-green-500">Applied</span>
          </h1>
        </div>
        <div className="flex gap-12">
          <ul className="flex font-medium items-center gap-3 text-gray-400">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-3 items-center">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer text-purple-500 ring flex justify-center items-center">
                  {userImage && userImage != "" ? (
                    <AvatarImage src={userImage} alt="avatar" />
                  ) : (
                    <div className="">
                      {user.fullname.charAt(0)}
                    </div>
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar className="cursor-pointer text-purple-500 ring flex justify-center items-center">
                    {userImage && userImage != "" ? (
                    <AvatarImage src={userImage} alt="avatar" />
                  ) : (
                    <div className="">
                      {user.fullname.charAt(0)}
                    </div>
                  )}
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground ">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-3">
                    <div>
                      <Button variant="link" className="gap-2">
                        <User2 />
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="gap-2"
                      >
                        <LogOut />
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
