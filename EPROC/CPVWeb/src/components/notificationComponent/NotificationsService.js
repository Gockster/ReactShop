import { Store } from 'react-notifications-component';

const notificationProps = {
    title: "Notification Title",
    message: "Notification Message",
    type: "info",
    insert: "top",
    container: "top-center"
};

export function addNotificationService(title = "Notification Title",
    message = "Notification Message",
    type = "info") {
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: null,//10000,
            onScreen: true
        }
    });
}

export function removeNotificationService() {

}
