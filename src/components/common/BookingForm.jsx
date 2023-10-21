
export default function BookingForm() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Đặt lịch hẹn
                </h2>
                <form action="#">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div className="w-full">
                            <label
                                htmlFor="brand"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Thời gian khám bệnh
                            </label>
                            <input
                                type="date"
                                name="brand"
                                id="brand"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Product brand"
                                required=""
                            />
                        </div>
                        <div className="w-full">
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Giờ hẹn
                            </label>
                            <input
                                type="time"
                                name="price"
                                id="price"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999"
                                required=""
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Chuyên khoa
                            </label>
                            <select
                                id="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option selected="">Chọn khoa</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="item-weight"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Bác sĩ
                            </label>
                            <select
                                id="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option selected="">Chọn bác sĩ</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Lý do khám
                            </label>
                            <textarea
                                id="description"
                                rows={8}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your description here"
                                defaultValue={""}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
                    >
                        Đặt lịch hẹn
                    </button>
                </form>
            </div>
        </section>

    )
}
