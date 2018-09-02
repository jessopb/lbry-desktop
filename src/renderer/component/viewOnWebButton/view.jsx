// @flow
import React from 'react';
import * as icons from 'constants/icons';
import Button from 'component/button';
import Tooltip from 'component/common/tooltip';

type Props = {
  claimId: string,
  claimName: string,
};

export default (props: Props) => {
  const { claimId, claimName } = props;
  const speechURL = claimName.startsWith('@')
    ? `${claimName}:${claimId}`
    : `${claimId}/${claimName}`;

  return claimId && claimName ? (
    <Tooltip onComponent body={__('View on Spee.ch')}>
      <Button icon={icons.GLOBE} button="alt" label={__('')} href={`http://spee.ch/${speechURL}`} />
    </Tooltip>
  ) : null;
};
