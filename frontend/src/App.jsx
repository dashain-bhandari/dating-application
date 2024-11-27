import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homebtn from "./components/Homebtn";
import Signup from "./components/Signup";
import About from "./pages/About";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Page_Not_Found from "./pages/Page_Not_Found";
import Profile_Page from "./components/Profile_Page";
import UserProfile from "./content/UserProfile";
import ChatSection from "./content/ChatSection";
import PresonaldetailForm from "./content/PresonaldetailForm";
import ContactDetails from "./content/ContactDetails";
import FamilyDetails from "./content/FamilyDetails";
import UploadProfileSection from "./content/UploadProfileSection";
import PreferenceDetails from "./content/PreferenceDetails";
import MyProfilesSidebar from "./content/MyProfilesSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toasts from "./components/Toast/Toast";
import { PrivateRoute } from "./layout/PrivateLayout";
import RegisterPage from "./pages/authentication/RegisterPage";
import FormLayout from "./layout/FormLayout";
import FirstForm from "./newComponent/Forms/FirstForm";
import SecondForm from "./newComponent/Forms/SecondForm";
import ThirdForm from "./newComponent/Forms/ThirdForm";
import FourthForm from "./newComponent/Forms/FourthForm";
import PhotoUploadForm from "./newComponent/Forms/PhotoUploadForm";
import HomeLayout from "./layout/HomeLayout";
import Searchedlist from "./content/Searchedlist";
import Dashboard from "./pages/InnerHome/Dashboard";
import DashboardSection from "./Section/DashboardSection";
import UserProfileSection from "./Section/UserProfileSection";
import ConnectionSection from "./Section/ConnectionSection";
import NotificationSection from "./Section/NotificationSection";
import EventSection from "./Section/EventSection";
import SettingSection from "./Section/SettingSection";
import { useState } from "react";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { AuthContext, AuthContextProvider } from "./utils/context/AuthContext";
import AppLayout from "./pages/AppLayout";
import ChatLayout from "./content/ChatSection/ChatLayout";
import ChatPanel from "./content/ChatSection/ChatPanel";
import RecommendSection from "./newComponent/RecommendSection/RecommendSection";
import NewProfileSection from "./newComponent/NewProfileSection/NewProfileSection";
import AboutMe from "./newComponent/AboutMe/AboutMe";
import Photos from "./newComponent/Photos/Photos";
import Connections from "./newComponent/Connections/Connections";
import ConversationBox from "./content/ChatSection/ConversationBox";
import CallBox from "./content/ChatSection/CallBox";
import CallPanel from "./newComponent/CallPanel/CallPanel";
import SearchResultSection from "./Section/SearchResultSection";
import { useMediaQuery } from "react-responsive";
import ConnectionLayout from "./Section/ConnectionLayout";
import PricingSection from "./Section/PricingSection";
import ViewUserProfile from "./newComponent/NewProfileSection/ViewUserProfile";
import AboutUser from "./newComponent/NewProfileSection/AboutUser";
import UserPhoto from "./newComponent/NewProfileSection/UserPhoto";
import LetsBegin from "./Section/LetsBegin";
import EmailNotVerified from "./pages/EmailVerification/EmailNotVerified";
import VerifyEmail from "./pages/EmailVerification/VerifyEmail";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ForgetPassword/ResetPassword";
import Login from "./components/Login/Login";
import { PrivateFormRoute } from "./layout/PrivateFormLayout";
import { EmailVerifyLayout } from "./layout/EmailVerifyLayout";
import Authentication from "./components/Authentication";
import NewFormLayout from "./layout/NewFormLayout";
import NewUploadAvatar from "./components/NewForm/NewUploadAvatar";
import NewFirstForm from "./components/NewForm/NewFirstForm";
import Success from "./components/success";
import { GlobalContextProvider } from "./utils/context/GlobalContext";
import Payment from "./dashain/payment";
import DashboardPage from "./pages/DashboardPage";
import DashBoardSidebar from "./pages/DashBoardSidebar";
import Footer from "./components/Footer";
import InnerHeader from "./pages/InnerHome/InnerHeader/InnerHeader";
import AllChatList from "./content/ChatSection/AllChatList";
import NewChatLayout from "./content/ChatSection/NewChatLayout";
import { axiosInstance } from "./http";
import NewInnerHeader from "./pages/InnerHome/InnerHeader/NewInnerHeader";
import Header from "./components/Header";
import PaymentPage from "./pages/PaymentPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChatContextProvider } from "./utils/context/ChatContext";
import AdminDashboard from "./dashain/admin-dashboard/adminDashboard";
import Overview from "./dashain/admin-dashboard/overview";
import User from "./dashain/admin-dashboard/users";
import Connection from "./dashain/admin-dashboard/connections";
import History from "./dashain/admin-dashboard/history";
import UserView from "./dashain/admin-dashboard/userView";
import ConnectionsView from "./dashain/admin-dashboard/connectionsView";
import { Helmet } from "react-helmet";
import Main from "./dashain/admin-dashboard/main";
import LoginDashboard from "./dashain/admin-dashboard/login";
import { Private } from "./dashain/admin-dashboard/private";
import Notifications from "./dashain/admin-dashboard/notifications";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 992px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 992px)" });

  return (
    <>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MPWB5LTXP1"></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MPWB5LTXP1');`}
        </script>
      </Helmet>
      <AuthContextProvider>
        <GoogleOAuthProvider clientId="255092581230-jidna1ng424fpr303kj2uua5v3vdt253.apps.googleusercontent.com">
          <ChatContextProvider>
            <GlobalContextProvider>
              <SocketContext.Provider value={socket}>
                <ToastContainer />
                <Toasts />
                <BrowserRouter>
                  <Homebtn />
                  <ScrollToTop/>
            
              <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin-dashboard" element={<LoginDashboard/>} >  </Route>
                   
                      <Route  path="/admin-dashboard/main" element={<Private><Main /></Private>}>
                      <Route path="overview" element={<Private><Overview /></Private>} />
                      <Route path="users" element={<Private><User /></Private>} />
                      <Route path="users/user/:id" element={<Private><UserView /></Private>} />
                      <Route path="connections" element={<Private><Connection /></Private>} />
                      <Route path="notifications" element={<Private><Notifications /></Private>} />
                      <Route path="connections/connection/:id" element={<Private><ConnectionsView /></Private>} />
                      <Route path="history" element={<Private><History /></Private>} />
                      <Route index element={<Private><Overview /></Private>} />
                      </Route>
                     
                  
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/payment-success?" element={<Success />} />
                    <Route path=":id/payment" element={<Payment />} />
                    <Route
                      path="/form"
                      element={
                        <PrivateFormRoute>
                          <NewFormLayout />
                        </PrivateFormRoute>
                      }
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/check" element={<DashboardPage />} />
                    <Route path="/help" element={<Help />} />
                    {/* <Route path="/login" element={isTablet ? <Login /> : <Signup />} /> */}
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/avatar/upload"
                      element={<NewUploadAvatar />}
                    />
                    <Route
                      path="/profile/info"
                      element={
                        <PrivateFormRoute>
                          <FormLayout />
                        </PrivateFormRoute>
                      }
                    />

                    <Route
                      path="/secondform"
                      element={
                        <PrivateRoute>
                          <FormLayout />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/thirdform"
                      element={
                        <PrivateRoute>
                          <FormLayout>
                            <ThirdForm />
                          </FormLayout>
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/fourthform"
                      element={
                        <PrivateRoute>
                          <FormLayout>
                            <FourthForm />
                          </FormLayout>
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/avatarUpload"
                      element={
                        <PrivateRoute>
                          <PhotoUploadForm />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/userprofile"
                      element={
                        <PrivateRoute>
                          <UserProfile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/chat"
                      element={
                        <PrivateRoute>
                          <ChatSection />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/personaldetails"
                      element={
                        <PrivateRoute>
                          <PresonaldetailForm />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/contactdetails"
                      element={
                        <PrivateRoute>
                          <ContactDetails />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/familydetails"
                      element={
                        <PrivateRoute>
                          <FamilyDetails />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/uploadprofile"
                      element={
                        <PrivateRoute>
                          <UploadProfileSection />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/preferencedetails"
                      element={
                        <PrivateRoute>
                          <PreferenceDetails />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/myprofile" element={<MyProfilesSidebar />} />
                    <Route
                      path="/email/verify/:resetToken"
                      element={<VerifyEmail />}
                    />
                    <Route
                      path="/password/forget"
                      element={<ForgetPassword />}
                    />
                    <Route
                      path="/reset/password/:token"
                      element={<ResetPassword />}
                    />

                    <Route path="/home" element={<PrivateFormRoute />}>
                      <Route path="payment" element={<PaymentPage />} />

                      <Route
                        path="main"
                        element={
                          <AppLayout>
                            <Header />
                            <HomeLayout />
                          </AppLayout>
                        }
                      >
                        <Route
                          path="dashboard"
                          element={<DashboardPage />}
                        ></Route>
                        <Route path="profiles" element={<Profile_Page />} />
                        <Route
                          path="search/:name"
                          element={<SearchResultSection />}
                        />
                        <Route path="letsBegin" element={<LetsBegin />} />
                        <Route
                          path="profile/me"
                          element={<NewProfileSection />}
                        >
                          <Route path="about" element={<AboutMe />} />
                          <Route path="photos" element={<Photos />} />
                          <Route path="connections" element={<Connections />} />
                        </Route>

                        <Route
                          path="profile/other/:id"
                          element={<ViewUserProfile />}
                        >
                          <Route path="about" element={<AboutUser />} />
                          <Route path="photos" element={<UserPhoto />} />
                          <Route path="connections" element={<Connections />} />
                        </Route>
                        <Route path="chatlist" element={<AllChatList />} />
                        <Route
                          path="connection"
                          element={<ConnectionLayout />}
                        />
                        <Route
                          path="notification"
                          element={<NotificationSection />}
                        />
                        <Route path="pricing" element={<PricingSection />} />
                        <Route path="settings" element={<SettingSection />} />
                        {/* <Route path="search" element={<Searchedlist />} /> */}

                        {/* {!isMobile ?
                      (<Route path="chat" element={<ChatLayout />} >
                        <Route path="conversation" element={<ChatPanel />} >
                          <Route path=":id" element={<ChatPanel />} />
                        </Route>
                      </Route>
                      ) : (
                        <>
                          <Route path="chat/conversation" element={<ChatPanel />} />
                          <Route path="chat/conversation/:id" element={<ChatPanel />} />
                        </>
                      )} */}

                        {!isMobile ? (
                          <Route path="chat" element={<ChatLayout />}>
                            <Route path="conversation" element={<ChatPanel />}>
                              <Route path=":id" element={<ChatPanel />} />
                            </Route>
                          </Route>
                        ) : (
                          <>
                            <Route
                              path="chat/conversation"
                              element={<ChatPanel />}
                            />
                            <Route
                              path="chat/conversation/:id"
                              element={<ChatPanel />}
                            />
                          </>
                        )}
                      </Route>
                    </Route>
                    <Route path="*" element={<Page_Not_Found />} />
                  </Routes>
                </BrowserRouter>
              </SocketContext.Provider>
            </GlobalContextProvider>
          </ChatContextProvider>
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
