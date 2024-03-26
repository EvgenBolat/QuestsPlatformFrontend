import FirstProfileBlock from "./ProfileBlocks/FirsrtProfileBlockl/FirstProfileBlock"
import ProfileHeader from "./ProfileHeader/ProfileHeader"
import "./ProfileContent.css"
import SecondProfileBlock from "./ProfileBlocks/SecondProfileBlock/SecondProfileBlock"

const ProfileContent = () => {
    return (
        <div>
            <ProfileHeader />
            <FirstProfileBlock />
            <SecondProfileBlock />
        </div>
    )
}

export default ProfileContent