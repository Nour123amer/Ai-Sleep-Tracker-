import { currentUser } from "@clerk/nextjs/server";

export const UserInfo = async () => {
    const user = await currentUser();
    console.log(currentUser)
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4 border border-gray-100">
      <div className="w-16 h-16 bg-pink-800 rounded-full flex items-center justify-center text-white text-3xl font-bold">
        {user?.firstName?.charAt(0).toUpperCase()}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-fuchsia-600 flex items-center gap-2">
          Welcome Back, {user?.firstName} 👋
        </h1>
        <p className="text-gray-600 text-sm mt-1 max-w-xs">
          Here's a quick overview of your recent sleep activity. Stay on top of your sleep record insights and manage your sleeps efficiently!
        </p>
        <div className="mt-4 space-y-1 text-sm">
          <p><span className="font-bold">Joined:</span> 
          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
          <p><span className="font-bold">Last Active:</span> 
          {user?.lastActiveAt ? new Date(user.lastActiveAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};