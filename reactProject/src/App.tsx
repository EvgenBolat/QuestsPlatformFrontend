import useRoutes from './routes/routes';
const App = () => {
  const routes = useRoutes()
  return (
    <div>
      {routes}
    </div>
  )
};

export default App;
