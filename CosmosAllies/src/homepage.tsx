import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const dates = [
    { day: "MON", date: 12 },
    { day: "TUE", date: 13 },
    { day: "WED", date: 14 },
    { day: "THU", date: 15 },
    { day: "FRI", date: 16 },
    { day: "SAT", date: 17 },
    { day: "SUN", date: 18 },
];

const initialSchedules = [
    {
        id: "1",
        name: "Aria Selene",
        initials: "AS",
        category: "Virtual Date",
        date: 21,
        time: "14:00 - 15:00",
        price: 50000,
        status: "Booked",
        color: "#8B63D9",
    },
    {
        id: "2",
        name: "Lyra Celeste",
        initials: "LC",
        category: "Study Companion",
        date: 22,
        time: "19:00 - 20:00",
        price: 35000,
        status: "Planned",
        color: "#4779C4",
    },
];

const allies = [
    {
        id: "1",
        name: "Lyra Celeste",
        initials: "LC",
        description: "A gentle soul who loves music and stargazing.",
        category: "Study Companion",
        rating: "4.9",
        price: 35000,
        gender: "Female",
        color: "#4779C4",
    },
    {
        id: "2",
        name: "Orion Vega",
        initials: "OV",
        description: "Your gaming partner and late-night conversation buddy.",
        category: "Gaming Companion",
        rating: "4.8",
        price: 40000,
        gender: "Male",
        color: "#9A65C7",
    },
    {
        id: "3",
        name: "Aria Selene",
        initials: "AS",
        description: "Enjoy a relaxing virtual date and meaningful conversations.",
        category: "Virtual Date",
        rating: "5.0",
        price: 50000,
        gender: "Female",
        color: "#C16D9A",
    },
];

const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`;
};

export default function Homepage() {
    const [selectedDate, setSelectedDate] = useState(12);
    const [selectedGender, setSelectedGender] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [schedules, setSchedules] = useState(initialSchedules);
    const [selectedTab, setSelectedTab] = useState("Home");

    const filteredAllies = allies.filter((ally) => {
        return selectedGender === "All" || ally.gender === selectedGender;
    });

    const filteredSchedules = schedules.filter((schedule) => {
        return selectedStatus === "All" || schedule.status === selectedStatus;
    });

    const handleNavigation = (tab: string) => {
        setSelectedTab(tab);

        if (tab !== "Home") {
            Alert.alert(
                tab,
                `Halaman ${tab} belum dihubungkan ke navigasi.`
            );
        }
    };

    const handleBooking = (ally: typeof allies[number]) => {
        Alert.alert(
            "Confirm Booking",
            `Book ${ally.name} for ${formatPrice(ally.price)} per hour?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        const newSchedule = {
                            id: `${Date.now()}`,
                            name: ally.name,
                            initials: ally.initials,
                            category: ally.category,
                            date: selectedDate,
                            time: "18:00 - 19:00",
                            price: ally.price,
                            status: "Planned",
                            color: ally.color,
                        };

                        setSchedules((previous) => [
                            ...previous,
                            newSchedule,
                        ]);

                        Alert.alert(
                            "Booking Added",
                            `${ally.name} has been added to your planned schedule.`
                        );
                    },
                },
            ]
        );
    };

    const handleCancel = (scheduleId: string, name: string) => {
        Alert.alert(
            "Cancel Booking",
            `Are you sure you want to cancel your schedule with ${name}?`,
            [
                {
                    text: "Keep Booking",
                    style: "cancel",
                },
                {
                    text: "Cancel Booking",
                    style: "destructive",
                    onPress: () => {
                        setSchedules((previous) =>
                            previous.filter((schedule) => schedule.id !== scheduleId)
                        );
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#121319" />

            <View pointerEvents="none" style={styles.backgroundGlow}>
                <View style={styles.purpleGlow} />
                <View style={styles.blueGlow} />
            </View>

            <View style={styles.navWrapper}>
                <View style={styles.navbar}>
                    <TouchableOpacity
                        style={styles.navBrand}
                        onPress={() => handleNavigation("Home")}
                    >
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>C</Text>
                        </View>

                        <Text style={styles.brandText}>COSMOS</Text>
                    </TouchableOpacity>

                    <View style={styles.navLinks}>
                        {["Home", "Explore", "Dates"].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.navItem,
                                    selectedTab === tab && styles.navItemActive,
                                ]}
                                onPress={() => handleNavigation(tab)}
                            >
                                <Text
                                    style={[
                                        styles.navText,
                                        selectedTab === tab && styles.navTextActive,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={() => handleNavigation("Profile")}
                    >
                        <Text style={styles.profileInitial}>U</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.topInfo}>
                        <View>
                            <Text style={styles.eyebrow}>YOUR PERSONAL UNIVERSE</Text>
                            <Text style={styles.greeting}>Welcome back, User</Text>
                            <Text style={styles.greetingSubtitle}>
                                Your next connection is waiting for you.
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.tokenButton}
                            onPress={() => handleNavigation("Wallet")}
                        >
                            <Text style={styles.tokenIcon}>✦</Text>
                            <View>
                                <Text style={styles.tokenAmount}>1,250</Text>
                                <Text style={styles.tokenLabel}>Cosmos Tokens</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.heroCard}>
                        <View style={styles.heroContent}>
                            <Text style={styles.heroEyebrow}>DISCOVER YOUR UNIVERSE</Text>
                            <Text style={styles.heroTitle}>
                                Meaningful connections, one star at a time.
                            </Text>
                            <Text style={styles.heroDescription}>
                                Find your ideal companion for conversations, gaming,
                                studying, and virtual dates.
                            </Text>

                            <TouchableOpacity
                                style={styles.heroButton}
                                onPress={() => handleNavigation("Explore")}
                            >
                                <Text style={styles.heroButtonText}>Explore Allies  →</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.heroDecoration}>
                            <Text style={styles.heroStar}>✦</Text>
                            <View style={styles.heroPlanet} />
                            <View style={styles.heroOrbit} />
                            <Text style={styles.smallStar}>✧</Text>
                        </View>
                    </View>

                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Your Schedule</Text>
                            <Text style={styles.sectionSubtitle}>
                                Keep track of your upcoming connections.
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => handleNavigation("Dates")}>
                            <Text style={styles.linkText}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.calendarList}
                    >
                        {dates.map((item) => (
                            <TouchableOpacity
                                key={item.date}
                                style={[
                                    styles.dateCard,
                                    selectedDate === item.date && styles.dateCardActive,
                                ]}
                                onPress={() => setSelectedDate(item.date)}
                            >
                                <Text
                                    style={[
                                        styles.dateDay,
                                        selectedDate === item.date && styles.dateTextActive,
                                    ]}
                                >
                                    {item.day}
                                </Text>

                                <Text
                                    style={[
                                        styles.dateNumber,
                                        selectedDate === item.date && styles.dateTextActive,
                                    ]}
                                >
                                    {item.date}
                                </Text>

                                <View
                                    style={[
                                        styles.dateDot,
                                        selectedDate === item.date && styles.dateDotActive,
                                    ]}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.filterRow}>
                        {["All", "Planned", "Booked"].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[
                                    styles.filterButton,
                                    selectedStatus === status && styles.filterButtonActive,
                                ]}
                                onPress={() => setSelectedStatus(status)}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        selectedStatus === status && styles.filterTextActive,
                                    ]}
                                >
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {filteredSchedules.length === 0 ? (
                        <View style={styles.emptyCard}>
                            <Text style={styles.emptyIcon}>✧</Text>
                            <Text style={styles.emptyTitle}>No schedules yet</Text>
                            <Text style={styles.emptyDescription}>
                                Your upcoming connections will appear here.
                            </Text>
                        </View>
                    ) : (
                        filteredSchedules.map((schedule) => (
                            <View key={schedule.id} style={styles.scheduleCard}>
                                <View
                                    style={[
                                        styles.avatar,
                                        { backgroundColor: schedule.color },
                                    ]}
                                >
                                    <Text style={styles.avatarText}>
                                        {schedule.initials}
                                    </Text>
                                </View>

                                <View style={styles.scheduleInfo}>
                                    <Text style={styles.scheduleName}>
                                        {schedule.name}
                                    </Text>
                                    <Text style={styles.scheduleCategory}>
                                        {schedule.category}
                                    </Text>

                                    <View style={styles.scheduleMeta}>
                                        <Text style={styles.metaText}>
                                            ◷ {schedule.time}
                                        </Text>
                                        <Text style={styles.metaText}>
                                            {formatPrice(schedule.price)}
                                        </Text>
                                    </View>

                                    <View
                                        style={[
                                            styles.statusBadge,
                                            schedule.status === "Booked"
                                                ? styles.bookedBadge
                                                : styles.plannedBadge,
                                        ]}
                                    >
                                        <Text style={styles.statusText}>
                                            {schedule.status}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() =>
                                        handleCancel(schedule.id, schedule.name)
                                    }
                                >
                                    <Text style={styles.cancelButtonText}>×</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}

                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Find Your Ally</Text>
                            <Text style={styles.sectionSubtitle}>
                                Meet someone who matches your energy.
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => handleNavigation("Explore")}>
                            <Text style={styles.linkText}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.genderFilters}
                    >
                        {["All", "Female", "Male"].map((gender) => (
                            <TouchableOpacity
                                key={gender}
                                style={[
                                    styles.genderButton,
                                    selectedGender === gender && styles.genderButtonActive,
                                ]}
                                onPress={() => setSelectedGender(gender)}
                            >
                                <Text
                                    style={[
                                        styles.genderText,
                                        selectedGender === gender && styles.genderTextActive,
                                    ]}
                                >
                                    {gender === "All"
                                        ? "All Allies"
                                        : gender === "Female"
                                            ? "Female Allies"
                                            : "Male Allies"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.allyList}>
                        {filteredAllies.map((ally) => (
                            <View key={ally.id} style={styles.allyCard}>
                                <View
                                    style={[
                                        styles.allyBanner,
                                        { backgroundColor: ally.color },
                                    ]}
                                >
                                    <View style={styles.allyBannerCircle} />
                                    <Text style={styles.allyInitials}>
                                        {ally.initials}
                                    </Text>

                                    <View style={styles.ratingBadge}>
                                        <Text style={styles.ratingText}>
                                            ★ {ally.rating}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.allyDetails}>
                                    <View style={styles.allyTitleRow}>
                                        <Text style={styles.allyName}>{ally.name}</Text>
                                        <View style={styles.onlineDot} />
                                    </View>

                                    <Text style={styles.allyCategory}>
                                        {ally.category}
                                    </Text>

                                    <Text style={styles.allyDescription}>
                                        {ally.description}
                                    </Text>

                                    <View style={styles.allyFooter}>
                                        <View>
                                            <Text style={styles.priceLabel}>Starting from</Text>
                                            <Text style={styles.allyPrice}>
                                                {formatPrice(ally.price)}
                                                <Text style={styles.perHour}> / hour</Text>
                                            </Text>
                                        </View>

                                        <TouchableOpacity
                                            style={styles.bookButton}
                                            onPress={() => handleBooking(ally)}
                                        >
                                            <Text style={styles.bookButtonText}>
                                                Book Ally
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerBrand}>COSMOS ALLIES</Text>
                        <Text style={styles.footerText}>
                            Your connection to the universe.
                        </Text>
                        <Text style={styles.copyright}>
                            {"\u00A9"} 2026 Cosmos Allies
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121319",
    },
    backgroundGlow: {
        ...StyleSheet.absoluteFill,
        overflow: "hidden",
    },
    purpleGlow: {
        position: "absolute",
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "#45276B",
        opacity: 0.18,
        top: 80,
        right: -130,
    },
    blueGlow: {
        position: "absolute",
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: "#244A7A",
        opacity: 0.15,
        top: 500,
        left: -150,
    },
    navWrapper: {
        zIndex: 10,
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 10,
    },
    navbar: {
        width: "100%",
        maxWidth: 900,
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#20212B",
        borderWidth: 1,
        borderColor: "#363342",
        borderRadius: 18,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    navBrand: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: "#473362",
        alignItems: "center",
        justifyContent: "center",
    },
    logoText: {
        color: "#D0BCFF",
        fontSize: 19,
        fontWeight: "800",
    },
    brandText: {
        color: "#E3E1EB",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1,
    },
    navLinks: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    navItem: {
        paddingHorizontal: 9,
        paddingVertical: 9,
        borderRadius: 10,
    },
    navItemActive: {
        backgroundColor: "#393047",
    },
    navText: {
        color: "#AAA5B9",
        fontSize: 11,
        fontWeight: "500",
    },
    navTextActive: {
        color: "#D6C2FF",
        fontWeight: "700",
    },
    profileButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#7256A6",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#A18ACD",
    },
    profileInitial: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    container: {
        width: "100%",
        maxWidth: 900,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingTop: 14,
    },
    topInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        gap: 12,
    },
    eyebrow: {
        color: "#B69BEA",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.5,
        marginBottom: 7,
    },
    greeting: {
        color: "#F0EDF8",
        fontSize: 23,
        fontWeight: "800",
    },
    greetingSubtitle: {
        color: "#A6A1B5",
        fontSize: 11,
        marginTop: 7,
        lineHeight: 17,
        maxWidth: 220,
    },
    tokenButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#252130",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#493B5E",
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 8,
    },
    tokenIcon: {
        color: "#D5B8FF",
        fontSize: 22,
    },
    tokenAmount: {
        color: "#F0E7FF",
        fontSize: 13,
        fontWeight: "800",
    },
    tokenLabel: {
        color: "#AFA2C7",
        fontSize: 8,
        marginTop: 3,
    },
    heroCard: {
        minHeight: 215,
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#51406D",
        backgroundColor: "#252033",
        marginBottom: 30,
    },
    heroContent: {
        flex: 1,
        paddingHorizontal: 19,
        paddingVertical: 22,
        zIndex: 2,
    },
    heroEyebrow: {
        color: "#C8A9FF",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.2,
        marginBottom: 10,
    },
    heroTitle: {
        color: "#F5F0FF",
        fontSize: 22,
        lineHeight: 29,
        fontWeight: "800",
        maxWidth: 340,
    },
    heroDescription: {
        color: "#C0B7D1",
        fontSize: 11,
        lineHeight: 17,
        marginTop: 9,
        maxWidth: 350,
    },
    heroButton: {
        alignSelf: "flex-start",
        backgroundColor: "#8B63D9",
        borderRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 11,
        marginTop: 16,
    },
    heroButtonText: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "700",
    },
    heroDecoration: {
        width: 90,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
    },
    heroStar: {
        position: "absolute",
        top: 22,
        right: 18,
        color: "#E6D5FF",
        fontSize: 25,
    },
    heroPlanet: {
        width: 75,
        height: 75,
        borderRadius: 38,
        backgroundColor: "#7860A6",
        borderWidth: 2,
        borderColor: "#B6A0E5",
        opacity: 0.9,
    },
    heroOrbit: {
        position: "absolute",
        width: 105,
        height: 38,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#B6A0E5",
        transform: [{ rotate: "-35deg" }],
    },
    smallStar: {
        position: "absolute",
        bottom: 35,
        left: 12,
        color: "#C5B0F2",
        fontSize: 20,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        marginTop: 4,
    },
    sectionTitle: {
        color: "#EAE6F4",
        fontSize: 19,
        fontWeight: "800",
    },
    sectionSubtitle: {
        color: "#9691A6",
        fontSize: 10,
        marginTop: 5,
    },
    linkText: {
        color: "#C3A5FF",
        fontSize: 11,
        fontWeight: "700",
    },
    calendarList: {
        gap: 9,
        paddingBottom: 17,
    },
    dateCard: {
        width: 51,
        height: 77,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#353340",
        backgroundColor: "#1C1D25",
    },
    dateCardActive: {
        backgroundColor: "#7654B6",
        borderColor: "#A88AE0",
    },
    dateDay: {
        color: "#9994A9",
        fontSize: 9,
        fontWeight: "600",
    },
    dateNumber: {
        color: "#E9E5F2",
        fontSize: 19,
        fontWeight: "800",
        marginTop: 7,
    },
    dateTextActive: {
        color: "#FFFFFF",
    },
    dateDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "transparent",
        marginTop: 5,
    },
    dateDotActive: {
        backgroundColor: "#FFFFFF",
    },
    filterRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 14,
    },
    filterButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#383542",
        backgroundColor: "#1C1D25",
    },
    filterButtonActive: {
        backgroundColor: "#393047",
        borderColor: "#6C548E",
    },
    filterText: {
        color: "#A9A3B8",
        fontSize: 10,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "#D7C2FF",
    },
    scheduleCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#1D1E27",
        borderWidth: 1,
        borderColor: "#353340",
        borderRadius: 16,
        padding: 13,
        marginBottom: 10,
        gap: 11,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "800",
    },
    scheduleInfo: {
        flex: 1,
    },
    scheduleName: {
        color: "#EAE6F4",
        fontSize: 13,
        fontWeight: "700",
    },
    scheduleCategory: {
        color: "#A59BB9",
        fontSize: 10,
        marginTop: 4,
    },
    scheduleMeta: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 10,
    },
    metaText: {
        color: "#BDB6CD",
        fontSize: 10,
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 9,
    },
    bookedBadge: {
        backgroundColor: "#263B36",
    },
    plannedBadge: {
        backgroundColor: "#342A49",
    },
    statusText: {
        color: "#D5C5F4",
        fontSize: 9,
        fontWeight: "700",
    },
    cancelButton: {
        width: 27,
        height: 27,
        borderRadius: 9,
        backgroundColor: "#30232D",
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButtonText: {
        color: "#F0A4B4",
        fontSize: 20,
        lineHeight: 22,
    },
    emptyCard: {
        alignItems: "center",
        backgroundColor: "#1D1E27",
        borderWidth: 1,
        borderColor: "#353340",
        borderRadius: 16,
        padding: 25,
        marginBottom: 25,
    },
    emptyIcon: {
        color: "#BBA0EE",
        fontSize: 30,
        marginBottom: 8,
    },
    emptyTitle: {
        color: "#EAE6F4",
        fontSize: 14,
        fontWeight: "700",
    },
    emptyDescription: {
        color: "#9993A8",
        fontSize: 11,
        textAlign: "center",
        marginTop: 7,
    },
    genderFilters: {
        gap: 8,
        paddingBottom: 15,
    },
    genderButton: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#373441",
        backgroundColor: "#1D1E27",
    },
    genderButtonActive: {
        backgroundColor: "#403052",
        borderColor: "#755A9E",
    },
    genderText: {
        color: "#A9A3B8",
        fontSize: 10,
        fontWeight: "600",
    },
    genderTextActive: {
        color: "#D8C6FF",
    },
    allyList: {
        gap: 14,
    },
    allyCard: {
        overflow: "hidden",
        backgroundColor: "#1D1E27",
        borderWidth: 1,
        borderColor: "#353340",
        borderRadius: 17,
    },
    allyBanner: {
        height: 125,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    allyBannerCircle: {
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: "#FFFFFF",
        opacity: 0.08,
        right: -20,
        top: -80,
    },
    allyInitials: {
        color: "#FFFFFF",
        fontSize: 35,
        fontWeight: "800",
        letterSpacing: 2,
    },
    ratingBadge: {
        position: "absolute",
        right: 12,
        top: 12,
        backgroundColor: "#24212C",
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 6,
    },
    ratingText: {
        color: "#F1D49A",
        fontSize: 10,
        fontWeight: "700",
    },
    allyDetails: {
        padding: 15,
    },
    allyTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    allyName: {
        color: "#EAE6F4",
        fontSize: 15,
        fontWeight: "800",
    },
    onlineDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#6BD5A2",
    },
    allyCategory: {
        color: "#B79BEA",
        fontSize: 10,
        fontWeight: "600",
        marginTop: 5,
    },
    allyDescription: {
        color: "#A7A1B5",
        fontSize: 11,
        lineHeight: 17,
        marginTop: 9,
    },
    allyFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        marginTop: 16,
    },
    priceLabel: {
        color: "#898497",
        fontSize: 9,
        marginBottom: 4,
    },
    allyPrice: {
        color: "#E8DDFD",
        fontSize: 13,
        fontWeight: "800",
    },
    perHour: {
        color: "#A6A0B4",
        fontSize: 9,
        fontWeight: "400",
    },
    bookButton: {
        backgroundColor: "#805CC7",
        borderRadius: 9,
        paddingHorizontal: 15,
        paddingVertical: 11,
    },
    bookButtonText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "700",
    },
    footer: {
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#302E3A",
        marginTop: 32,
        paddingTop: 22,
    },
    footerBrand: {
        color: "#D4C0FA",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 2,
    },
    footerText: {
        color: "#9690A5",
        fontSize: 10,
        marginTop: 7,
    },
    copyright: {
        color: "#6F6A7D",
        fontSize: 9,
        marginTop: 13,
    },
});