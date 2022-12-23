/* eslint-disable react-hooks/exhaustive-deps */
import Slider from "../components/slider/Slider";
import RowList from "../components/list-movie/RowList";
import { useMenus } from "../context/MenusContext";
import { useEffect } from "react";
import { types } from "../context/MenusContext";
import Guide from "../utils/Guide";
import Config from "../Config";
import { getItemComponent } from "../utils/Functions";
import AdsItem from "../components/AdsItem";
import BannerItem from "../components/BannerItem";

//تابعی برای درخواست میباست به صورت ناهمزمان باشد تا در خواست منتظر بماند تا بگیرد
let fetchMenus = async (dispatch) => {
    // درخواستی ارسال میشود 
    dispatch({ type: types.SET_LOADING });
    // درخواست برای دیتاگیری این سه آیتم برای API میباشند
    const { data: { succeeded, result, error } } = await Guide.get('api/v3.0/menus');
    // شرطی برای استفاده از دیتا اگر دیتا با موفقیت دریافت شده باشد
    if (succeeded === true && error === null) {
        const homePageIndex = result.findIndex(item => item.slug === "index");
        let home = {};
        if (homePageIndex > -1) {
            home = result[homePageIndex];
        }
        // ارسال درخواست برای ردیوسر که توسط تایپ دیتا هارا به ردیوسر میبرد
        dispatch({
            type: types.SET_DATA,
            home: home,
            data: result
        });
    } else {
        // اگر دیتا با موفقیت نیامد این درخواست ارسال شود
        dispatch({ type: types.SET_ERROR, errors: error });
    }
}

const Home = () => {

    // چیزهایی که از استیت میخواهیم بگیریم هوک درخواستی ما
    const { state: menus, dispatch } = useMenus();

    useEffect(() => {
        // هنوز درخواستی داده نشده پس درخواست میدهیم
        fetchMenus(dispatch);
    }, [dispatch]);


    return (
        <div>
            <div className="">
                <div className="">
                    {(menus.loading === false && menus.succeeded === true)
                        && menus.home.pageItems.map(({ payloadType, payloadKey, ...pageItem }) => {

                            let section = undefined;
                            // eslint-disable-next-line default-case
                            switch (payloadType) {
                                case Config.pageItemsType.Slider:
                                    section = <Slider key={`page-section-${pageItem.pageItemId}`} sliderID={payloadKey} />;
                                    break;
                                case Config.pageItemsType.Latest:
                                case Config.pageItemsType.LatestEpisods:
                                case Config.pageItemsType.CategoryGroup:
                                case Config.pageItemsType.ExclusiveDubs:
                                case Config.pageItemsType.PostGroup:
                                    let itemComponent = getItemComponent(payloadType);
                                    section = <RowList key={`page-section-${pageItem.pageItemId}`} data={{
                                        payloadType,
                                        payloadKey,
                                        title: pageItem.caption
                                    }} ItemComponent={itemComponent} />;
                                    break;

                                case Config.pageItemsType.Advertisement:
                                    section = <RowList className="Advertisement" key={`page-section-${pageItem.pageItemId}`} data={{
                                        payloadType,
                                        payloadKey,
                                    }} ItemComponent={AdsItem} />
                                    break;
                                case Config.pageItemsType.BannerGroup:
                                    section = <RowList className="Banner" key={`page-section-${pageItem.pageItemId}`} data={{
                                        payloadType,
                                        payloadKey,
                                    }} ItemComponent={BannerItem} />
                                    break;
                                default:
                                    section = undefined;
                            }
                            return section;
                        })}
                </div>
            </div>
        </div>
    )
};

export default Home;
