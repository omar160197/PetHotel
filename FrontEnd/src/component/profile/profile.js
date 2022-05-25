import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/graphqlUser/graphqlUserSlice";

const Profile =({username})=>{
const dispatch=useDispatch()
const navigate = useNavigate();

  return(
    <div style={{ marginTop: "16px" }}>
                <DropdownButton variant="" title={<span style={{color:"black",fontWeight:"bold" ,marginRight:"10%"}}>{`${username&&username}`}</span>} >
                  <Dropdown.Item href="#/action-1">
                    {" "}
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa-solid fa-user"
                    ></i>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    {" "}
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa-solid fa-message"
                    ></i>
                    Group Chat
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item 
                  onClick={()=>{
                    dispatch(logout());
                    navigate("/")
                  }}
                  >
                    <i
                      style={{ marginRight: "10px", color: "red" }}
                      className="fa-solid fa-arrow-right-from-bracket"
                    ></i>
                    <span style={{ color: "red" }}>Logout</span>
                  </Dropdown.Item>
                </DropdownButton>
              </div>
)
}
export default Profile