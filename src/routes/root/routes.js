import FilterList from '../../components/FilterList';

export default [
  {
    path: '/',
    component: FilterList,
    exact: true,
  },
  {
    path: '/:postId/details',
    component: FilterList,
    exact: true,
  },
];
