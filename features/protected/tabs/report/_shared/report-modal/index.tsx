import React from "react";
import {
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { ReportModalHeader, ReportModalProps } from "./Header";

interface Props extends ReportModalProps {
  scrollable?: boolean;
}

export const ReportModal = ({
  visible,
  onClose,
  title,
  subtitle,
  children,
  showCloseButton = true,
  scrollable = true,
  systemName = "LockOut USA",
  systemSubtitle = "Security System",
}: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      {/* Background overlay */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Center container */}
      <View style={styles.centerContainer}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <ReportModalHeader
            title={title}
            subtitle={subtitle}
            onClose={onClose}
            showCloseButton={showCloseButton}
            systemName={systemName}
            systemSubtitle={systemSubtitle}
            visible={false}
          >
            {children}
          </ReportModalHeader>

          {/* Scroll or static content */}
          {scrollable ? (
            <ScrollView
              style={{ paddingHorizontal: 16 }}
              contentContainerStyle={{ paddingBottom: 16, paddingTop: 16 }}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            <View
              style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}
            >
              {children}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)", // semi-transparent dark overlay
    // Optional: simulate blur using "blurred" background image (hack)
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalContainer: {
    maxHeight: "90%",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
  },
});
