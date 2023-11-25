// import React from 'react';


const Profile = function () {
    return (
        <>
            <div className="container mx-auto mt-8">
                <div className="max-w-md mx-auto bg-white p-8 border rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                    <form action="#" method="post">
                        {/* Name */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input w-full"
                            />
                        </div>
                        {/* Username */}
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-input w-full"
                            />
                        </div>
                        {/* Gender */}
                        <div className="mb-4">
                            <label
                                htmlFor="gender"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Gender
                            </label>
                            <select id="gender" name="gender" className="form-select w-full">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input w-full"
                            />
                        </div>
                        {/* NumberPhone */}
                        <div className="mb-4">
                            <label
                                htmlFor="numberPhone"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Number Phone
                            </label>
                            <input
                                type="text"
                                id="numberPhone"
                                name="numberPhone"
                                className="form-input w-full"
                            />
                        </div>
                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-input w-full"
                            />
                        </div>
                        {/* Date of Birth */}
                        <div className="mb-4">
                            <label
                                htmlFor="dateOfBirth"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                className="form-input w-full"
                            />
                        </div>
                        {/* Address */}
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block text-gray-600 text-sm font-medium mb-2"
                            >
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                className="form-textarea w-full"
                                defaultValue={""}
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default Profile;
