import { chatxbtServices } from '@chatxbt-sdk/index';
import { 
    useEffect 
} from 'react';
import swal from 'sweetalert';

export const utilityAndConfig = () => {

    const _utilAndConfigService = chatxbtServices.utilityAndConfig(props);

    // utilAndConfig service
    const {
        store:{
            _hasHydrated,
            theme,
            message,
            loading,
        },

        action:{
            setTheme,
            setMessage,
            clearMessage,
            stopAllLoadingProccess
        }
    } = _utilAndConfigService

    /**
     * handle message alert
     */
    useEffect(() => {

        // display message
        message.show && swal({
            title: message.title,
            text: message.description,
            icon: message.type,
            button: "ok",
        });

        // hide message
        message.show && setTimeout(() => {
            clearMessage();
        }, 5000)
    }, [message.show]);

    /**
     * handle loading
     */
    useEffect(() => {
        loading.proccessesCount === 0 && loading.active && stopAllLoadingProccess();
    }, [loading.proccessesCount]);


    return {
        utilityAndConfigService: {
            ..._utilAndConfigService
        },
        ...props
    };
}