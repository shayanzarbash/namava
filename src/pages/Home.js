/* eslint-disable react-hooks/exhaustive-deps */
import Slider from "../components/slider/Slider";
import RowList from "../components/list-movie/RowList";
import { useMenus } from "../context/MenusContext";
import { useEffect } from "react";
import { types } from "../context/MenusContext";
import Guide from "../utils/Guide";

let fetchMenus = async (dispatch) => {
    dispatch({ type: types.SET_LOADING });
    const { data: { succeeded, result, error } } = await Guide.get('api/v1.0/menus');
    console.log("res", result);
    if (succeeded === true && error === null) {
        const homePageIndex = result.findIndex(item => item.slug === "index");
        let home = {};
        if (homePageIndex > -1) {
            home = result[homePageIndex];
        }
        dispatch({
            type: types.SET_DATA,
            home: home,
            data: result
        });

    } else {
        dispatch({ type: types.SET_ERROR, errors: error });
    }

}

const Home = () => {



    let { state: menus, dispatch } = useMenus();


    useEffect(() => {
        // هنوز درخواستی داده نشده پس درخواست میدهیم

        fetchMenus(dispatch);

    }, [dispatch])

    console.log("menus", menus.home)


    return (
        <div>
            <div className="">
                <div className="">
                    {(menus.loading === false && menus.succeeded === true)
                        && menus.home.pageItems.map(({ payloadType, payloadKey, ...pageItem }) => {
                            let section = undefined;

                            // eslint-disable-next-line default-case
                            switch (payloadType) {
                                case "Slider":
                                    section = <Slider key={`page-section-${pageItem.pageItemId}`} sliderID={payloadKey} />;
                                    break;

                                case "PostGroup":
                                    section = <RowList key={`page-section-${pageItem.pageItemId}`} data={{
                                        payloadType,
                                        payloadKey,
                                        title: pageItem.caption
                                    }} />;
                                    break;

                            }
                            return section;
                        })}
                </div>
            </div>
        </div>
    )
};

export default Home;
