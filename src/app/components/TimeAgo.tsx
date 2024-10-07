'use client';

import ReactTimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import turkishStrings from 'react-timeago/lib/language-strings/tr';

export default function TimeAgo({ createdAt }: { createdAt: string }) {
  const formatter = buildFormatter(turkishStrings);
  return (
    <>
      <ReactTimeAgo date={createdAt} formatter={formatter} />
    </>
  );
}
