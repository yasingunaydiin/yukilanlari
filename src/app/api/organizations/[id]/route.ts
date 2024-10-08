import { WorkOS } from '@workos-inc/node';
import { NextRequest, NextResponse } from 'next/server';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orgId = params.id;

  if (!orgId) {
    return NextResponse.json(
      { error: 'Invalid organization ID' },
      { status: 400 }
    );
  }

  try {
    await workos.organizations.deleteOrganization(orgId);
    return NextResponse.json(
      { message: 'Organization deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    const statusCode = errorMessage.includes('not found') ? 404 : 500;
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
