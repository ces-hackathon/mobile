/*
 *  Created By JD.Francis on 8/7/18
 */
import { createStackNavigator } from 'react-navigation';
import UserLogin from "./src/components/User/UserLogin/UserLogin";
import TrainList from "./src/components/Trains/TrainList/TrainList";
import TrainDetails from "./src/components/Trains/TrainDetails/TrainDetails";
import SearchWizard from "./src/components/SearchWizard/SearchWizard";

export default Navigator = createStackNavigator({
    Home: {
        screen: UserLogin
    },
    TrainList: {
        screen: TrainList
    },
    TrainDetails: {
        screen: TrainDetails
    },
    SearchWizard: {
        screen: SearchWizard
    }
});