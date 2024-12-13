import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
	const id = parseInt(params.id);
	try {
		await prisma.house.delete({ where: { id } });
		return json('Successfully deleted');
	} catch (e) {
		console.error(e);
		//@ts-ignore
		if (e.code === 'P2025') return error(404, { message: 'House not found or invalid id' });
		return error(500, { message: 'Internal error deleting House' });
	}
};
