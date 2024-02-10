import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders } from "../../redux/slices/providers";
import Provider from "./Provider/Provider";

function Providers() {
    const dispatch = useDispatch();
    const {providers} = useSelector((state) => state.providers)

    const isProvidersLoading = providers.status === "loading"

    React.useEffect(() => {
        const providers = dispatch(fetchProviders())
    }, [])

    return(
        <div>
            {isProvidersLoading ? "Loading" : providers.items.data.map((provider) => {
                return (
                    <Provider provider={provider}/>
                )
            })}
        </div>
    )
}

export default Providers;