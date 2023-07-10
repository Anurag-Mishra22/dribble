import { ProjectInterface, UserProfile } from '@/common.types'
import Image from 'next/image'

import Link from 'next/link'
import Button from "./Button";
import ProjectCard from './ProjectCard';

type Props = {
    user: UserProfile;
}

const ProfilePage = ({ user }: Props) => (
    <div>
        <h1>Profile Page</h1>
    </div>
)

export default ProfilePage