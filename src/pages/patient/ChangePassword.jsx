const ChangePassword = function () {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Đổi mật khẩu
                    </h1>
                    <form className="mt-4" action="/change-password" method="POST">
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700"
                                htmlFor="old-password"
                            >
                                Mật khẩu cũ
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password"
                                id="old-password"
                                name="old-password"
                                required=""
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700"
                                htmlFor="new-password"
                            >
                                Mật khẩu mới
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password"
                                id="new-password"
                                name="new-password"
                                required=""
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-gray-700"
                                htmlFor="confirm-password"
                            >
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                required=""
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
                                type="submit"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
