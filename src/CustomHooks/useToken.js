import { toast } from 'react-toastify';

const useToken = () => {
    async function updateNewUserData(user) {
        return await fetch('http://localhost:5000/user', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.user?.email, displayName: user?.user?.displayName, photoURL: user?.user?.photoURL })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken);
                if (data?.result?.matchedCount) {
                    toast(`Welcome Back Mr.${user?.user?.displayName}`);
                } else {
                    toast(`Thank your Mr.${user?.user?.displayName || "User"} for being with us`);
                };
                return data;
            })
    }

    return { updateNewUserData }
};

export default useToken;