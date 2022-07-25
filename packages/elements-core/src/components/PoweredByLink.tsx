import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { Box, Flex, Icon } from '@stoplight/mosaic';
import * as React from 'react';

export const PoweredByLink: React.FC<{
  source: string;
  pathname: string;
  packageType: 'elements' | 'elements-dev-portal';
  layout?: 'sidebar' | 'stacked';
}> = ({ source, pathname, packageType, layout = 'sidebar' }) => {
  return (
    <Flex
      as="a"
      align="center"
      borderT={layout === 'stacked' ? undefined : true}
      px={layout === 'stacked' ? 1 : 4}
      py={3}
      justify={layout === 'stacked' ? 'end' : undefined}
      href={`https://portal.idf.cts`}
      target="_blank"
      userSelect="none"
      rel="noopener noreferrer"
    >
      <Box as={Icon} icon={faBolt} mr={1} className="fa-fw" style={{ color: 'rgba(144, 97, 249, 1)' }} />

      <Box>
        powered by&nbsp;<strong>IDFCTS</strong>
      </Box>
    </Flex>
  );
};
