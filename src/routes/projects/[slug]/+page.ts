import { error } from '@sveltejs/kit';
import { projects } from '#lib/projects.js';
import type { PageLoad } from './$types';

export const entries = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
  const project = projects.find(project => project.slug === params.slug);
  if (!project) error(404, 'Project not found');
  return { project };
};
