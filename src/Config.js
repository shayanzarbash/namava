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
            url: 'api/v1.0/post-groups/{{PAYLOAD_KEY}}/medias',
            pi: 1,
            ps: 20
        }
    }
}