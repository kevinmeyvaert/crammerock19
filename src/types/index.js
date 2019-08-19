// @flow

import type { TStages } from '../util/enums';

export type TFile = {
    url: string,
};

export type TImage = {
    file: TFile,
};

export type TSponsorLogo = {
    file: TFile,
}

export type TChildMarkdownRemark = {
    html: string,
}

export type TText = {
    childMarkdownRemark: TChildMarkdownRemark,
};

export type TNews = {
    title: string,
    slug: string,
    post: TText,
    publishDate: string,
    featuredImage: TImage,
};

export type TArtist = {
    name: string,
    slug: string,
    artistLevel: number,
    headerImage: TImage,
    bio: TText,
    showStart: string,
    showEnd: string,
    stage: TStages,
    day: string,
    youtubeVideoId?: string,
    facebook?: string,
    twitter?: string,
    instagram?: string,
    soundcloud?: string,
    spotifyArtistId?: string,
    spotify?: string,
    website?: string,
};

export type TSponsor = {
    website?: string,
    logo: TSponsorLogo,
    sponsor: string,
    onHomepage: boolean,
};

export type TSettingsNode = {
    ticketpagina?: boolean,
    infopagina?: boolean,
    lineuppagina?: boolean,
    dagindeling?: boolean,
    tijdIndeling?: boolean,
    podiumIndeling?: boolean,
    lijstjestijd?: boolean,
};

export type TSettings = {
    node: TSettingsNode,
};
