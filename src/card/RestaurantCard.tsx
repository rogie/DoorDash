/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { getOverride, getOverrideProps } from '../helpers/overrides';
import { LevelContext } from '../heading';
import {
  Action as StyledAction,
  Body as StyledBody,
  Contents as StyledContents,
  HeaderImage as StyledHeaderImage,
  Root as StyledRoot,
  Thumbnail as StyledThumbnail,
  Title as StyledTitle,
} from './styled-components';

import type { CardProps } from './types';

export function hasThumbnail(props: { readonly thumbnail?: string }) {
  return !!props.thumbnail;
}

function RestaurantCard(props: CardProps) {
  const {
    title,
    isFavorite,
    isRated,
    hasThumbnail,
    hasPromo,
    hasRating, 
    hasDetails,
    thumbnail: thumbnailSrc,
    overrides,
    ...restProps
  } = props;

  const {
    Action: ActionOverride,
    Body: BodyOverride,
    Contents: ContentsOverride,
    HeaderImage: HeaderImageOverride,
    Root: RootOverride,
    Thumbnail: ThumbnailOverride,
    Title: TitleOverride,
  } = overrides;

  const Action = getOverride(ActionOverride) || StyledAction;
  const Body = getOverride(BodyOverride) || StyledBody;
  const Contents = getOverride(ContentsOverride) || StyledContents;
  const HeaderImage = getOverride(HeaderImageOverride) || StyledHeaderImage;
  const Root = getOverride(RootOverride) || StyledRoot;
  const Thumbnail = getOverride(ThumbnailOverride) || StyledThumbnail;
  const Title = getOverride(TitleOverride) || SemanticTitle;

  const headerImageProps = typeof headerImage === 'string' ? { src: headerImage } : headerImage;

  // @ts-ignore
  const $hasThumbnail = hasThumbnail(props);
  return (
    <Root data-baseweb="card" {...restProps} {...getOverrideProps(RootOverride)}>
      {headerImage && (
        <HeaderImage {...headerImageProps} {...getOverrideProps(HeaderImageOverride)} />
      )}
      <Contents {...getOverrideProps(ContentsOverride)}>
        {thumbnailSrc && <Thumbnail src={thumbnailSrc} {...getOverrideProps(ThumbnailOverride)} />}
        {title && (
          <Title $hasThumbnail={$hasThumbnail} {...getOverrideProps(TitleOverride)}>
            {title}
          </Title>
        )}
        <Body {...getOverrideProps(BodyOverride)}>{children}</Body>
        {action && <Action {...getOverrideProps(ActionOverride)}>{action}</Action>}
      </Contents>
    </Root>
  );
}

Card.defaultProps = {
  action: null,
  children: null,
  hasThumbnail,
  overrides: {},
};

export default Card;
