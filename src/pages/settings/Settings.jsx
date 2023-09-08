import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.scss";

function Settings() {
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Title</span>
          <span className="settingsDeleteTitle">Delete Title</span>
        </div>
        <form className="settingsForm">
          <label htmlFor="">Profile Picture</label>
          <div className="settingsPP">
            <img
              src="https://c0.wallpaperflare.com/preview/625/902/466/flowers-interior-room-home.jpg"
              alt=""
            />
            <label htmlFor="fileInput">
              <i class="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input type="file" id="fileInput" style={{display:"none"}}/>
          </div>
          <label htmlFor="Username">Username</label>
          <input type="text" placeholder="Username"/>
          <label htmlFor="Username">Email</label>
          <input type="email" placeholder="Email"/>
          <label htmlFor="Username">Password</label>
          <input type="tepasswordxt" placeholder="Password"/>
          <button className="settingsSubmit">Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;
