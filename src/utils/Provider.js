import { MenusProvider } from "../context/MenusContext";
import { SliderProvider } from "../context/SliderContext";


const Provider = ({ children }) => {
    return (
        <MenusProvider>
            <SliderProvider>
                {children}
            </SliderProvider>
        </MenusProvider>
    )
}

export default Provider;    