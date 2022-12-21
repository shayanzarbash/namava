/* eslint-disable import/no-anonymous-default-export */
const pageItemsType = {
    Slider: "Slider",
    Advertisement: "Advertisement",
    PostGroup: "PostGroup",
    Latest: "Latest",
    LatestMovies: "LatestMovies",
    LatestSeries: "LatestSeries",
    Favorite: "Favorite",
    LatestEpisods: "LatestEpisods",
    ExclusiveDubsMovies: "ExclusiveDubsMovies",
    ExclusiveDubsSeries: "ExclusiveDubsSeries",
    ExclusiveDubs: "ExclusiveDubs",
    CategoryGroup: "CategoryGroup",
    BannerGroup: "BannerGroup",
};

export default {
    baseUrl: "https://www.namava.ir",
    itemTypes: {
        PurchasableMovie: "PurchasableMovie",
        Series: "Series",
        Movie: "Movie",
    },
    pageItemsType,
    sections: {
        [pageItemsType.Slider]: {
            url: "api/v1.0/medias/sliders/{{SLIDER_ID}}"
        },
        [pageItemsType.PostGroup]: {
            url: 'api/v1.0/post-groups/{{PEYLOAD_KEY}}/medias',
            pi: 1,
            ps: 20
        },
        [pageItemsType.Latest]: {
            url: 'api/v1.0/medias/latest',
            pi: 1,
            ps: 20
        },
        [pageItemsType.LatestEpisods]: {
            url: 'api/v1.0/medias/latest-episods',
            pi: 1,
            ps: 20
        },
        [pageItemsType.CategoryGroup]: {
            url: '/api/v1.0/category-groups/{{PEYLOAD_KEY}}/latest-medias',
            pi: 1,
            ps: 20
        },
        [pageItemsType.ExclusiveDubs]: {
            url: 'api/v1.0/medias/exclusive-dubs',
            pi: 1,
            ps: 20
        },
        [pageItemsType.Advertisement]: {
            url: 'api/v1.0/medias/commercials/{{PEYLOAD_KEY}}',
            pi: 1,
            ps: 20
        }
    }
}