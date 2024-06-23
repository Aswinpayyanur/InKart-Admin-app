import { StyleSheet } from "react-native";
import colors from "../../common/colors";

const style = (width, height, isPortrait) => StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        height: height,
        justifyContent: 'center',
        marginTop: 30,
    },
    Head: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: colors.black_level_3,
        marginBottom: 10,
    }

})

export default style;