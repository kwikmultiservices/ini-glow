import React, { useState } from "react";
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firestore instance
import { toast } from "react-toastify";
import { database } from "../firebase";

const AccountSettings = () => {
  const auth = getAuth();
  const storage = getStorage();

  // State for form values
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Section 1: Update user info
  const handleUpdateInfo = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const userDoc = doc(database, "user", user.uid);
      // Update Firestore user document
      await updateDoc(userDoc, {
        ...(userInfo.name && { name: userInfo.name }),
        ...(userInfo.email && { email: userInfo.email }),
        ...(userInfo.phone && { phone: userInfo.phone }),
      });
      toast.success("User info updated successfully!");
    } catch (error) {
      toast.error("Failed to update user info.");
    }
  };

  // Section 2: Upload user image
  const handleUploadImage = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !image) return;
      const imageRef = ref(storage, `user/${user.uid}/profileImage`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const userDoc = doc(database, "user", user.uid);
      await updateDoc(userDoc, { image: imageUrl });
      toast.success("Profile image updated successfully!");
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  // Section 3: Reset password
  const handleResetPassword = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !oldPassword || !newPassword) return;

      const credential = EmailAuthProvider.credential(user.email || "", oldPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error("Failed to reset password.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl mb-6 font-bold">Account Settings</h2>

      {/* Section 1: Update User Info */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Update Personal Info</h3>
        <div className="mt-4 flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleUpdateInfo}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Info
          </button>
        </div>
      </div>

      {/* Section 2: Upload Profile Image */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Upload Profile Image</h3>
        <div className="mt-4 flex flex-col space-y-4">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleUploadImage}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Upload Image
          </button>
        </div>
      </div>

      {/* Section 3: Reset Password */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Reset Password</h3>
        <div className="mt-4 flex flex-col space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={handleResetPassword}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
