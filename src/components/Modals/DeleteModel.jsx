import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


// eslint-disable-next-line react/prop-types
export default function DeleteModel({ isOpen, onClose, onDelete, message }) {

    return (
        <>
            <Modal show={isOpen} size="md" onClose={onClose} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this {message} ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            {/* onDelete callback được gửi vào */}
                            <Button color="failure" onClick={onDelete}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={onClose}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

