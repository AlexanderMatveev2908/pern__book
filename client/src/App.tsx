import { FC, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/Home/HomePage";
import { setNavigator } from "@/core/lib/lib";
import UserLayout from "./layouts/UserLayout";
import { useNinjaToken, useScroll } from "@/core/hooks/hooks";
import OwnerLayout from "./layouts/OwnerLayout/OwnerLayout";
import CreateBooksStorePage from "./pages/OwnerLayout/BookStoreLayout/CreateBooksStore/CreateBooksStorePage";
import Register from "./pages/AuthLayout/Register/Register";
import Login from "./pages/AuthLayout/Login/Login";
import ForgotPwd from "./pages/AuthLayout/ForgotPwd/ForgotPwd";
import VerifyAccount from "./pages/AuthLayout/VerifyAccount/VerifyAccount";
import ChoseNewPwd from "./pages/AuthLayout/ChoseNewPwd/ChoseNewPwd";
import ProfileSettings from "./pages/UserLayout/ProfileSettings/ProfileSettings";
import ManageAccount from "./pages/UserLayout/ManageAccount/ManageAccount";
import VerifyAccountLogged from "./pages/UserLayout/VerifyAccountLogged/VerifyAccountLogged";
import SecurityPwd from "./pages/UserLayout/SecurityPwd/SecurityPwd";
import VerifyCb from "./pages/VerifyCb/VerifyCb";
import Notice from "./pages/Notice/NoticePage";
import SwapCtxProvider from "./core/contexts/SwapCtx/SwapAddressProvider";
import BookStorePage from "./pages/OwnerLayout/BookStoreLayout/BookStorePage/BookStorePage";
import BookStoreLayout from "./layouts/OwnerLayout/BookStoreLayout";
import UpdateBookStore from "./pages/OwnerLayout/BookStoreLayout/UpdateBookStore/UpdateBookStore";
import BookStores from "./pages/OwnerLayout/BookStoreLayout/BookStores/BookStores";
import SearchCtxProvider from "./core/contexts/SearchCtx/SearchCtxProvider";
import CreateBook from "./pages/OwnerLayout/BooksLayout/CreateBook/CreateBook";
import BooksOwnerLayout from "./layouts/OwnerLayout/BooksOwnerLayout";
import BooksList from "./pages/OwnerLayout/BooksLayout/BooksList/BooksList";
import UpdateBook from "./pages/OwnerLayout/BooksLayout/UpdateBook/UpdateBook";
import BookPage from "./pages/OwnerLayout/BooksLayout/BookPage/BookPage";
import WorkerLayout from "./layouts/WorkerLayout/WorkerLayout";
import BookStoresLayoutWorker from "./layouts/WorkerLayout/BookStoresLayoutWorker";
import BookStoreListWorker from "./pages/WorkerLayout/BookStoreLayout/BookStoreList/BookStoreListWorker";
import UpdateBookStoreManager from "./pages/WorkerLayout/BookStoreLayout/UpdateBookStore/UpdateBookStoreManager";
import BookStorePageWorker from "./pages/WorkerLayout/BookStoreLayout/BookStorePage/BookStorePageWorker";
import BooksLayoutWorker from "./layouts/WorkerLayout/BooksLayoutWorker";
import BookListWorker from "./pages/WorkerLayout/BooksLayout/BookListWorker/BookListWorker";
import BookPageWorker from "./pages/WorkerLayout/BooksLayout/BookPageWorker/BookPageWorker";
import CreateBookWorker from "./pages/WorkerLayout/BooksLayout/CreateBookWorker/CreateBookWorker";
import UpdateBookWorker from "./pages/WorkerLayout/BooksLayout/UpdateBookWorker/UpdateBookWorker";

const App: FC = () => {
  useScroll();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useNinjaToken();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index={true} element={<HomePage />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route
            path="register"
            element={
              <SwapCtxProvider>
                <Register />
              </SwapCtxProvider>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="verify-account" element={<VerifyAccount />} />
          <Route path="forgot-pwd" element={<ForgotPwd />} />
          <Route path="chose-new-pwd" element={<ChoseNewPwd />} />
        </Route>

        <Route path="user" element={<UserLayout />}>
          <Route path="verify-account" element={<VerifyAccountLogged />} />
          <Route
            path="profile-settings"
            element={
              <SwapCtxProvider>
                <ProfileSettings />
              </SwapCtxProvider>
            }
          />
          <Route path="manage-account" element={<ManageAccount />} />
          <Route path="security" element={<SecurityPwd />} />
        </Route>

        <Route path="owner" element={<OwnerLayout />}>
          <Route path="book-store" element={<BookStoreLayout />}>
            <Route
              path="book-stores"
              element={
                <SearchCtxProvider>
                  <BookStores />
                </SearchCtxProvider>
              }
            />

            <Route
              path="create"
              element={
                <SwapCtxProvider>
                  <CreateBooksStorePage />
                </SwapCtxProvider>
              }
            />

            <Route path=":bookStoreID" element={<BookStorePage />} />
            <Route
              path="update/:bookStoreID"
              element={
                <SwapCtxProvider>
                  <UpdateBookStore />
                </SwapCtxProvider>
              }
            />
          </Route>

          <Route path="books" element={<BooksOwnerLayout />}>
            <Route path="add-book" element={<CreateBook />} />
            <Route path="update/:bookID" element={<UpdateBook />} />
            <Route
              path="list"
              element={
                <SearchCtxProvider>
                  <BooksList />
                </SearchCtxProvider>
              }
            />
            <Route path=":bookID" element={<BookPage />} />
          </Route>
        </Route>

        <Route path="worker" element={<WorkerLayout />}>
          <Route path="book-stores" element={<BookStoresLayoutWorker />}>
            <Route
              path="list"
              element={
                <SearchCtxProvider>
                  <BookStoreListWorker />
                </SearchCtxProvider>
              }
            />
            <Route
              path="update/:bookStoreID"
              element={
                <SwapCtxProvider>
                  <UpdateBookStoreManager />
                </SwapCtxProvider>
              }
            />
            <Route path=":bookStoreID" element={<BookStorePageWorker />} />
          </Route>

          <Route path="books" element={<BooksLayoutWorker />}>
            <Route
              path="list"
              element={
                <SearchCtxProvider>
                  <BookListWorker />
                </SearchCtxProvider>
              }
            />

            <Route path=":bookID" element={<BookPageWorker />} />

            <Route path="post/:bookStoreID" element={<CreateBookWorker />} />

            <Route path="put/:bookID" element={<UpdateBookWorker />} />
          </Route>
        </Route>

        <Route path="notice" element={<Notice />} />
        <Route path="verify-cb" element={<VerifyCb />} />

        {/* <Route path="chat" element={<Chat />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};
export default App;
