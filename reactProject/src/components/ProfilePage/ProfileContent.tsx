import FirstProfileBlock from "./ProfileBlocks/FirsrtProfileBlockl/FirstProfileBlock"
import ProfileHeader from "./ProfileHeader/ProfileHeader"
import "./ProfileContent.css"
import useAuth from "../../hooks/useAuth";

const ProfileContent = () => {
    return (
        <div>
            <ProfileHeader />
            <FirstProfileBlock />
        </div>
    )
}

export default ProfileContent