import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { publicRoutes } from "~/routes";
import { DefaultLayout } from "./components/Layout";
import { Fragment } from "react";
// Fragment là một component không hiển thị gì trên giao diện
// Fragment được sử dụng để nhóm các component lại với nhau

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            // nếu layout === null thì hiển thị trang đó không có layout
            // nếu layout === DefaultLayout thì hiển thị trang đó có layout
            // Fragment để không hiển thị layout
            // const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;

            //mặc đinh Layout = DefaultLayout
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              //nếu layout = null thì lấy Fragment nghĩa là 0 có layout

              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
