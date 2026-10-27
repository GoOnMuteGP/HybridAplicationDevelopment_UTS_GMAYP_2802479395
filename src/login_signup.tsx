import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginScreenProps = {
    onBack: () => void;
    onLoginSuccess: () => void;
};

export default function LoginScreen({ onBack, onLoginSuccess, }: LoginScreenProps) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    const isValidPassword =
        password.length >= 8 &&
        /[A-Za-z]/.test(password) &&
        /\d/.test(password) &&
        /[^A-Za-z0-9\s]/.test(password);

    const isFormValid =
        isValidEmail &&
        isValidPassword &&
        (!isSignUp || name.trim() !== "");

    const handleSubmit = () => {
        setError("");

        if (isSignUp && name.trim() === "") {
            Alert.alert("Validasi Gagal", "Nama wajib diisi.");
            setError("Nama wajib diisi.");
            return;
        }

        if (email.trim() === "") {
            Alert.alert("Validasi Gagal", "Email wajib diisi.");
            setError("Email wajib diisi.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            Alert.alert("Validasi Gagal", "Format email tidak valid.");
            setError("Format email tidak valid.");
            return;
        }

        if (password.length < 8) {
            Alert.alert(
                "Validasi Password",
                "Password minimal 8 karakter. Saat ini password kamu belum memenuhi panjang minimum."
            );
            setError("Password minimal 8 karakter.");
            return;
        }

        if (!/[A-Za-z]/.test(password)) {
            Alert.alert(
                "Validasi Password",
                "Password harus memiliki minimal 1 huruf."
            );
            setError("Password harus memiliki minimal 1 huruf.");
            return;
        }

        if (!/\d/.test(password)) {
            Alert.alert(
                "Validasi Password",
                "Password harus memiliki minimal 1 angka, misalnya 1, 2, atau 3."
            );
            setError("Password harus memiliki minimal 1 angka.");
            return;
        }

        if (!/[^A-Za-z0-9\s]/.test(password)) {
            Alert.alert(
                "Validasi Password",
                "Password harus memiliki minimal 1 tanda baca dan 1 simbol, misalnya !, @, atau #."
            );
            setError("Password harus memiliki minimal 1 tanda baca dan 1 simbol, misalnya !, @, atau #.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess();
        }, 500);
    };

    const changePage = () => {
        setIsSignUp((previous) => !previous);
        setName("");
        setEmail("");
        setPassword("");
        setError("");
        setShowPassword(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.logo}>
                                <Text style={styles.logoText}>C</Text>
                            </View>

                            <Text style={styles.brand}>COSMOS ALLIES</Text>
                            <Text style={styles.tagline}>
                                Your connection to the universe
                            </Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.title}>
                                {isSignUp ? "Create Account" : "Welcome Back"}
                            </Text>

                            <Text style={styles.subtitle}>
                                {isSignUp
                                    ? "Join Cosmos Allies and meet new friends."
                                    : "Sign in to continue your journey."}
                            </Text>

                            {isSignUp && (
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Full Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your name"
                                        placeholderTextColor="#8E8B9F"
                                        value={name}
                                        onChangeText={setName}
                                        autoCapitalize="words"
                                        editable={!isLoading}
                                    />
                                </View>
                            )}

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#8E8B9F"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    editable={!isLoading}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>

                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="At least 8 characters"
                                        placeholderTextColor="#8E8B9F"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        editable={!isLoading}
                                    />

                                    <Pressable
                                        onPress={() => setShowPassword((previous) => !previous)}
                                        hitSlop={10}
                                        disabled={isLoading}
                                    >
                                        <Text style={styles.showPassword}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            {!isSignUp && (
                                <Pressable
                                    style={styles.rememberRow}
                                    onPress={() => setRememberMe((previous) => !previous)}
                                    disabled={isLoading}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            rememberMe && styles.checkboxActive,
                                        ]}
                                    >
                                        {rememberMe ? (
                                            <Text style={styles.checkmark}>✓</Text>
                                        ) : null}
                                    </View>

                                    <Text style={styles.rememberText}>
                                        Remember me
                                    </Text>
                                </Pressable>
                            )}

                            {error !== "" ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : null}

                            <Pressable
                                style={[
                                    styles.submitButton,
                                    (!isFormValid || isLoading) && styles.disabledButton,
                                ]}
                                onPress={handleSubmit}
                                disabled={isLoading}
                            >
                                <Text style={styles.submitButtonText}>
                                    {isLoading
                                        ? "Please wait..."
                                        : isSignUp
                                            ? "Create Account"
                                            : "Sign In"}
                                </Text>
                            </Pressable>

                            <View style={styles.switchRow}>
                                <Text style={styles.switchText}>
                                    {isSignUp
                                        ? "Already have an account?"
                                        : "New to Cosmos Allies?"}
                                </Text>

                                <Pressable
                                    onPress={changePage}
                                    disabled={isLoading}
                                >
                                    <Text style={styles.switchButton}>
                                        {isSignUp ? "Sign In" : "Sign Up"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <Text style={styles.footer}>
                            COSMOS ALLIES {"\u00A9"} 2026
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#121319",
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    container: {
        width: "100%",
        maxWidth: 420,
        alignSelf: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    header: {
        alignItems: "center",
        marginBottom: 32,
    },
    logo: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: "#302545",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#59447C",
    },
    logoText: {
        color: "#D0BCFF",
        fontSize: 30,
        fontWeight: "700",
    },
    brand: {
        color: "#E3E1EB",
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 2,
    },
    tagline: {
        color: "#A6A1B5",
        fontSize: 12,
        marginTop: 8,
    },
    card: {
        backgroundColor: "#1E1F26",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#34313F",
        padding: 24,
    },
    title: {
        color: "#E3E1EB",
        fontSize: 25,
        fontWeight: "700",
    },
    subtitle: {
        color: "#A6A1B5",
        fontSize: 13,
        lineHeight: 20,
        marginTop: 8,
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 18,
    },
    label: {
        color: "#D8D3E5",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#403B4C",
        backgroundColor: "#17171F",
        paddingHorizontal: 14,
        color: "#FFFFFF",
        fontSize: 14,
    },
    passwordContainer: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#403B4C",
        backgroundColor: "#17171F",
        paddingHorizontal: 14,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
        color: "#FFFFFF",
        fontSize: 14,
    },
    showPassword: {
        color: "#D0BCFF",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 10,
    },
    rememberRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: 20,
    },
    checkbox: {
        width: 17,
        height: 17,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#777184",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 9,
    },
    checkboxActive: {
        backgroundColor: "#8B63D9",
        borderColor: "#8B63D9",
    },
    checkmark: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "700",
    },
    rememberText: {
        color: "#B8B3C7",
        fontSize: 12,
    },
    errorText: {
        color: "#FF8A8A",
        fontSize: 12,
        marginBottom: 14,
    },
    submitButton: {
        minHeight: 48,
        borderRadius: 10,
        backgroundColor: "#8B63D9",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },
    disabledButton: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
    switchRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
        gap: 5,
    },
    switchText: {
        color: "#A6A1B5",
        fontSize: 12,
    },
    switchButton: {
        color: "#D0BCFF",
        fontSize: 12,
        fontWeight: "700",
    },
    footer: {
        color: "#777184",
        fontSize: 10,
        textAlign: "center",
        marginTop: 24,
        letterSpacing: 1,
    },
});