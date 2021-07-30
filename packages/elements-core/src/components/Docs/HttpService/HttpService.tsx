import { Box, Heading, VStack } from '@stoplight/mosaic';
import { withErrorBoundary } from '@stoplight/react-error-boundary';
import { IHttpService } from '@stoplight/types';
import * as React from 'react';

import { MockingContext } from '../../../containers/MockingProvider';
import { MarkdownViewer } from '../../MarkdownViewer';
import { PoweredByLink } from '../../PoweredByLink';
import { DocsComponentProps } from '..';
import { VersionBadge } from '../HttpOperation/Badges';
import { SecuritySchemes } from './SecuritySchemes';
import { ServerInfo } from './ServerInfo';

export type HttpServiceProps = DocsComponentProps<Partial<IHttpService>>;

const HttpServiceComponent = React.memo<HttpServiceProps>(({ data, location = {}, layoutOptions }) => {
  const { search, pathname } = location;
  const mocking = React.useContext(MockingContext);
  const query = new URLSearchParams(search);

  return (
    <Box mb={10}>
      {data.name && !layoutOptions?.noHeading && (
        <Heading size={1} mb={4} fontWeight="semibold">
          {data.name}
        </Heading>
      )}
      {data.version && (
        <Box mb={5}>
          <VersionBadge value={data.version} />
        </Box>
      )}
      {pathname && layoutOptions?.showPoweredByLink && (
        <PoweredByLink source={data.name ?? 'no-title'} pathname={pathname} packageType="elements" layout="stacked" />
      )}
      <VStack spacing={6}>
        <ServerInfo servers={data.servers ?? []} mockUrl={mocking.mockUrl} />
        <Box>
          {data.securitySchemes?.length && (
            <SecuritySchemes schemes={data.securitySchemes} defaultScheme={query.get('security') || undefined} />
          )}
        </Box>
      </VStack>
      {data.description && <MarkdownViewer className="sl-my-5" markdown={data.description} />}
    </Box>
  );
});
HttpServiceComponent.displayName = 'HttpService.Component';

export const HttpService = withErrorBoundary<HttpServiceProps>(HttpServiceComponent, { recoverableProps: ['data'] });
