import { WorkOS } from '@workos-inc/node';
import { NextRequest, NextResponse } from 'next/server';

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  console.log('Received delete request for organization ID:', id);

  if (!id) {
    console.error('Invalid organization ID:', id);
    return NextResponse.json(
      { error: 'Invalid organization ID' },
      { status: 400 }
    );
  }

  try {
    // First, try to fetch the organization
    console.log('Attempting to fetch organization details');
    const org = await workos.organizations.getOrganization(id);
    console.log('Organization found:', org.id);

    // If fetch succeeds, proceed with deletion
    console.log('Attempting to delete organization');
    await workos.organizations.deleteOrganization(id);
    console.log('Organization deleted successfully');
    return NextResponse.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error('Error in organization operation:', error);
    if (error instanceof Error) {
      console.log('Error message:', error.message);
      console.log('Error name:', error.name);
      if (error.message.includes('did not match the expected pattern')) {
        return NextResponse.json(
          { error: 'Invalid organization ID format: ' + error.message },
          { status: 400 }
        );
      } else if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Organization not found: ' + error.message },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { error: 'Unexpected error: ' + error.message },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
