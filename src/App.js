import { registerRootComponent } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator ,TouchableOpacity} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Homescreen';
import News from './screens/NewsFeed';
import Chat from './screens/Chat';
import Help from './screens/Help';
import Chats from './screens/Chats';
import Login from './screens/Login';
import Users from './screens/Users';
import About from './screens/About';
import Group from './screens/Group';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import Account from './screens/Account';
import {auth} from './config/firebase';
import Settings from './screens/Settings';
import ChatInfo from './screens/ChatInfo';
import {colors} from './config/constants';
import ChatMenu from './components/ChatMenu';
import ChatHeader from './components/ChatHeader';
import { UnreadMessagesContext, UnreadMessagesProvider } from './contexts/UnreadMessagesContext';
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from './contexts/AuthenticatedUserContext';
import { useNavigation } from '@react-navigation/native';
import Details from './screens/DetailScreen';
import NewsFeed from './screens/NewsFeed';
import ArticleScreen from './screens/DetailScreen';
import CustomHeader from './components/CustomHeader';
import CreatePostScreen from './screens/CreatePostScreen';
import HomeScreen from './screens/Homescreen';
import PostDetails from "./screens/PostDetails";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { unreadCount, setUnreadCount } = useContext(UnreadMessagesContext);
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName ;
          switch (route.name) {
            case 'Chats':
             iconName = 'chatbubbles';
             break;
             case 'Settings':
               iconName = 'settings';
               break;
           case 'Home':
             iconName = 'home';
             break;
           case 'News':
             iconName = 'newspaper';
             break;
          
         }
         if (!focused && !iconName.endsWith('-outline')) {
           iconName += '-outline';
          }
          return <Ionicons name={iconName} size={35} color={color}  />;
        },
          
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        headerShown: true,
        presentation: 'modal',
        tabBarStyle: {
          height: 70, 
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius:15,
          borderTopRightRadius:20 
        },
       headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="person-circle-outline" size={45} color="black" />
          </TouchableOpacity>
        ),
        headerTitle: () => <CustomHeader navigation={navigation} />,
      })}
    >
      <Tab.Screen name="Chats" options={{ tabBarBadge: unreadCount > 0 ? unreadCount : null }}>
        {() => <Chats setUnreadCount={setUnreadCount} />}
      </Tab.Screen>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="News" component={News}/>
     
    </Tab.Navigator>
  );
};

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({ route }) => ({
        headerTitle: () => <ChatHeader chatName={route.params.chatName} chatId={route.params.id} />,
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ChatMenu chatName={route.params.chatName} chatId={route.params.id} />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ChatMenu chatName={route.params?.chatName} chatId={route.params?.id} />
          </View>
        ),
      })}
    />
    <Stack.Screen name="Details" component={Details} />
    <Stack.Screen  name="Settings"  component={Settings}/>
    <Stack.Screen name="Users" component={Users} options={{ title: 'Select User' }} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="About" component={About} />
    <Stack.Screen name="Help" component={Help} />
    <Stack.Screen name="Account" component={Account} />
    <Stack.Screen name="Group" component={Group} options={{ title: 'New Group' }} />
    <Stack.Screen name="ChatInfo" component={ChatInfo} options={{ title: 'Chat Information' }} />
    <Stack.Screen name="NewsFeed" component={NewsFeed} />
    <Stack.Screen name="Article" component={ArticleScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ title: 'Create Post' }} />
    <Stack.Screen name="PostDetails" component={PostDetails} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (authenticatedUser) => {
      setUser(authenticatedUser || null);
      setIsLoading(false);
    });

    return unsubscribeAuth;
  }, [setUser]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <NavigationContainer>{user ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};

const App = () => (
    <MenuProvider>
      <AuthenticatedUserProvider>
        <UnreadMessagesProvider>
          <RootNavigator />
        </UnreadMessagesProvider>
      </AuthenticatedUserProvider>
    </MenuProvider>
  );

  export default registerRootComponent(App);
