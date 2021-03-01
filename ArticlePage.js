import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { SpacingLayout } from '@layouts/SpacingLayout';
import { api } from '@api';
import { useFetch } from '@hooks';
import { getDayMonthYearFormat } from '@utils/date';
import { parse } from '@utils/html';
import { InformationView } from '@shared/InformationView';

import { ReactComponent as ErrorImage } from '@assets/images/error.svg';

import { ArticlePageSkeleton } from './ArticlePageSkeleton';

export const ArticlePage = ({ slug }) => {
  const { t, i18n } = useTranslation();
  const language = useSelector(state => state.auth.user?.language.code);
  const article = useFetch({ apiMethod: api.article.get, apiArguments: [slug, language || i18n.language] });

  if (article.isLoading) {
    return (
      <SpacingLayout>
        <ArticlePageSkeleton />
      </SpacingLayout>
    );
  }

  if (article.isError) {
    return (
      <SpacingLayout>
        <InformationView image={<ErrorImage />} text={t('errorText')} />
      </SpacingLayout>
    );
  }

  return (
    <SpacingLayout>
      <>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography>
              {t('updated')} {getDayMonthYearFormat(article.data.updated_at)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Typography variant="h3" gutterBottom>
              {article.data.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto" style={{ opacity: 0 }}>
            <Typography>
              {t('updated')} {getDayMonthYearFormat(article.data.updated_at)}
            </Typography>
          </Grid>
        </Grid>
        <Typography>{parse(article.data.body)}</Typography>
      </>
    </SpacingLayout>
  );
};

ArticlePage.propTypes = {
  slug: PropTypes.oneOf(['terms-and-conditions', 'privacy-policy']).isRequired,
};
