import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { RoastLevelSlider } from './RoastLevelSlider';
import { ModeToggle } from './ModeToggle';
import { ChatMode } from '../types/chat';

const { width, height } = Dimensions.get('window');

interface HomepageProps {
  onStartChat: (mode: ChatMode, roastLevel?: number) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onStartChat }) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [hoveredMode, setHoveredMode] = useState<ChatMode | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [roastLevel, setRoastLevel] = useState(5);
  const [selectedMode, setSelectedMode] = useState<ChatMode>('convince-ai');

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Cycle through features for the hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const pulseAnimation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.8, 1.1, 0.8],
  });

  const heroFeatures = [
    { icon: '🧠', text: "Smart AI Conversations", color: '#22d3ee' },
    { icon: '⚡', text: "Fun Chat Battles", color: '#facc15' },
    { icon: '🌐', text: "Two Game Modes", color: '#a855f7' },
    { icon: '✨', text: "Totally Free to Play", color: '#ec4899' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Background Effects */}
      <View style={styles.backgroundEffect1} />
      <View style={styles.backgroundEffect2} />
      <View style={styles.backgroundEffect3} />
      <View style={styles.backgroundEffect4} />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: [{ scale: pulseAnimation }],
            },
          ]}
        />
      ))}
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Enhanced Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroGlow}>
            <View style={styles.heroContent}>
              {/* Main Title with Enhanced Effects */}
              <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.aiTitle}>AI</Text>
                  <View style={styles.vsIcon}>
                    <Text style={styles.vsIconText}>⚡</Text>
                  </View>
                  <Text style={styles.humanTitle}>HUMAN</Text>
                </View>
              </View>
              
              {/* Subtitle */}
              <Text style={styles.subtitle}>
                Can You Outsmart an AI? Can AI Catch a Human?
              </Text>
              
              <Text style={styles.description}>
                Play the ultimate mind game! Challenge a smart AI that thinks it's human, or try to prove you're human to a suspicious AI detective. 
                It's like a fun debate game where you use your wits to win!
              </Text>
              
              {/* Dynamic Feature Showcase */}
              <View style={styles.featureShowcase}>
                <View style={styles.featureIcons}>
                  {heroFeatures.map((feature, index) => (
                    <View
                      key={index}
                      style={[
                        styles.featureIcon,
                        {
                          backgroundColor: activeFeature === index 
                            ? 'rgba(71, 85, 105, 0.8)' 
                            : 'rgba(30, 41, 59, 0.5)',
                          transform: [{ scale: activeFeature === index ? 1.1 : 1 }]
                        }
                      ]}
                    >
                      <Text style={styles.featureIconText}>{feature.icon}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.featureTitle, { color: heroFeatures[activeFeature].color }]}>
                  {heroFeatures[activeFeature].text}
                </Text>
              </View>
              
              {/* Key Features */}
              <View style={styles.keyFeatures}>
                <View style={styles.keyFeature}>
                  <Text style={[styles.keyFeatureNumber, { color: '#22d3ee' }]}>Free</Text>
                  <Text style={styles.keyFeatureLabel}>No Signup Required</Text>
                </View>
                <View style={styles.keyFeature}>
                  <Text style={[styles.keyFeatureNumber, { color: '#a855f7' }]}>∞</Text>
                  <Text style={styles.keyFeatureLabel}>Possibilities</Text>
                </View>
                <View style={styles.keyFeature}>
                  <Text style={[styles.keyFeatureNumber, { color: '#fb7185' }]}>24/7</Text>
                  <Text style={styles.keyFeatureLabel}>Always Online</Text>
                </View>
              </View>
            </View>
          </View>        
          </View>

        {/* Roast Level Selection */}
        <View style={styles.roastLevelSection}>
          <Text style={styles.roastLevelTitle}>⚡ Choose Your AI Intensity</Text>
          <Text style={styles.roastLevelSubtitle}>
            How savage should the AI be in this battle of wits?
          </Text>
          <RoastLevelSlider 
            value={roastLevel} 
            onChange={setRoastLevel}
          />        
          </View>

        {/* Mode Selection */}
        <View style={styles.modeSelectionSection}>
          <Text style={styles.modeSectionTitle}>🎯 Choose Your Challenge</Text>
          <Text style={styles.modeSectionSubtitle}>
            Select your mission in this AI vs Human battle
          </Text>
          {/* <ModeToggle
            mode={selectedMode}
            onChange={setSelectedMode}
          /> */}
        </View>

        {/* Enhanced Mode Selection Cards */}
        <View style={styles.modeContainer}>
          {/* Convince AI Mode */}          
          <TouchableOpacity 
            style={[styles.modeCard, styles.convinceAiCard]}
            onPress={() => onStartChat('convince-ai', roastLevel)}
            activeOpacity={0.9}
          >
            <View style={styles.modeCardGlow} />
            <View style={styles.modeCardContent}>
              {/* Top accent bar */}
              <View style={[styles.accentBar, { backgroundColor: '#22d3ee' }]} />
              
              {/* Header */}
              <View style={styles.modeHeader}>
                <View style={styles.modeIconContainer}>
                  <View style={[styles.modeIcon, { backgroundColor: '#0891b2' }]}>
                    <Text style={styles.modeIconText}>🧠</Text>
                  </View>
                  <View style={styles.modeOrbitDot1} />
                  <View style={styles.modeOrbitDot2} />
                </View>
                
                <View style={styles.statusIndicators}>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(34, 211, 238, 0.1)', borderColor: 'rgba(34, 211, 238, 0.2)' }]}>
                    <View style={[styles.statusDot, { backgroundColor: '#22d3ee' }]} />
                    <Text style={[styles.statusText, { color: '#22d3ee' }]}>AI READY TO CHAT</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)' }]}>
                    <Text style={[styles.statusText, { color: '#3b82f6' }]}>🖥️ THINKS IT'S HUMAN</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.2)' }]}>
                    <Text style={[styles.statusText, { color: '#a855f7' }]}>📊 ATTITUDE: MAXIMUM</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.modeBody}>
                <Text style={styles.modeTitle}>TRY TO CONVINCE THE AI</Text>
                <View style={[styles.modeTitleUnderline, { backgroundColor: '#22d3ee' }]} />
                
                <Text style={styles.modeDescription}>
                  Chat with an AI that's absolutely convinced it's a real human! It will argue, joke, and even get sassy with you. 
                  Your mission: prove to it that it's actually an AI. Good luck - this AI has quite the attitude!
                </Text>
                
                {/* What to expect section */}
                <View style={styles.expectationBox}>
                  <Text style={[styles.expectationTitle, { color: '#22d3ee' }]}>🎯 What You'll Experience:</Text>
                  <View style={styles.expectationList}>
                    <Text style={styles.expectationItem}>→ AI that acts super human and denies being AI</Text>
                    <Text style={styles.expectationItem}>→ Funny and sarcastic responses</Text>
                    <Text style={styles.expectationItem}>→ Fun debate and argument challenges</Text>
                    <Text style={styles.expectationItem}>→ Choose how sassy you want the AI to be</Text>
                  </View>
                </View>
                
                {/* Feature grid */}
                <View style={styles.featureGrid}>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(34, 211, 238, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#22d3ee' }]}>👁️ STUBBORN AI</Text>
                    <Text style={styles.featureGridDesc}>AI that really thinks it's human</Text>
                  </View>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(59, 130, 246, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#3b82f6' }]}>⚡ FUNNY CHAT</Text>
                    <Text style={styles.featureGridDesc}>Jokes and sarcasm included</Text>
                  </View>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(168, 85, 247, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#a855f7' }]}>🌐 LOGIC WARFARE</Text>
                    <Text style={styles.featureGridDesc}>Battle against stubborn digital ego</Text>
                  </View>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(236, 72, 153, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#ec4899' }]}>⚛️ PERSONALITY CORE</Text>
                    <Text style={styles.featureGridDesc}>Superior intellect simulation active</Text>
                  </View>
                </View>
                
                {/* Action button */}
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#0891b2' }]}
                  onPress={() => onStartChat('convince-ai', roastLevel)}
                >
                  <Text style={styles.actionButtonText}>START CHATTING</Text>
                  <Text style={styles.actionButtonIcon}>⬡</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Prove Human Mode */}
          <TouchableOpacity 
            style={[styles.modeCard, styles.proveHumanCard]}
            onPress={() => onStartChat('prove-human', roastLevel)}
            activeOpacity={0.9}
          >
            <View style={styles.modeCardGlow} />
            <View style={styles.modeCardContent}>
              {/* Top accent bar */}
              <View style={[styles.accentBar, { backgroundColor: '#fb7185' }]} />
              
              {/* Header */}
              <View style={styles.modeHeader}>
                <View style={styles.modeIconContainer}>
                  <View style={[styles.modeIcon, { backgroundColor: '#dc2626' }]}>
                    <Text style={styles.modeIconText}>🛡️</Text>
                  </View>
                  <View style={[styles.modeOrbitDot1, { backgroundColor: '#fb7185' }]} />
                  <View style={[styles.modeOrbitDot2, { backgroundColor: '#dc2626' }]} />
                </View>
                
                <View style={styles.statusIndicators}>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(251, 113, 133, 0.1)', borderColor: 'rgba(251, 113, 133, 0.2)' }]}>
                    <View style={[styles.statusDot, { backgroundColor: '#fb7185' }]} />
                    <Text style={[styles.statusText, { color: '#fb7185' }]}>DETECTIVE MODE ON</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(220, 38, 38, 0.1)', borderColor: 'rgba(220, 38, 38, 0.2)' }]}>
                    <Text style={[styles.statusText, { color: '#dc2626' }]}>🗂️ CHECKING IF YOU'RE HUMAN</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: 'rgba(236, 72, 153, 0.1)', borderColor: 'rgba(236, 72, 153, 0.2)' }]}>
                    <Text style={[styles.statusText, { color: '#ec4899' }]}>🌊 SUSPICION: HIGH</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.modeBody}>
                <Text style={styles.modeTitle}>PROVE YOU'RE HUMAN</Text>
                <View style={[styles.modeTitleUnderline, { backgroundColor: '#fb7185' }]} />
                
                <Text style={styles.modeDescription}>
                  This AI detective is suspicious of everyone! It thinks you might be a robot pretending to be human. 
                  Answer its tricky questions and prove you're really human. Can you pass the ultimate human test?
                </Text>
                
                {/* What to expect section */}
                <View style={styles.expectationBox}>
                  <Text style={[styles.expectationTitle, { color: '#fb7185' }]}>💡 What You'll Experience:</Text>
                  <View style={styles.expectationList}>
                    <Text style={styles.expectationItem}>→ Suspicious AI that thinks you're a robot</Text>
                    <Text style={styles.expectationItem}>→ Tricky questions about feelings and emotions</Text>
                    <Text style={styles.expectationItem}>→ Fun challenges to test if you're human</Text>
                    <Text style={styles.expectationItem}>→ Creative tasks only humans can do</Text>
                  </View>
                </View>
                
                {/* Feature grid */}
                <View style={styles.featureGrid}>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(251, 113, 133, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#fb7185' }]}>👁️ DETECTIVE AI</Text>
                    <Text style={styles.featureGridDesc}>AI that's looking for robot clues</Text>
                  </View>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(220, 38, 38, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#dc2626' }]}>🧠 FEELINGS TEST</Text>
                    <Text style={styles.featureGridDesc}>Questions about emotions and feelings</Text>
                  </View>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(236, 72, 153, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#ec4899' }]}>👥 HUMAN PROOF</Text>
                    <Text style={styles.featureGridDesc}>Fun creativity and personality tests</Text>
                  </View>
                  <View style={[styles.featureGridItem, { borderColor: 'rgba(250, 204, 21, 0.2)' }]}>
                    <Text style={[styles.featureGridTitle, { color: '#facc15' }]}>✨ SUSPICION AI</Text>
                    <Text style={styles.featureGridDesc}>Doubt-driven interrogation system</Text>
                  </View>
                </View>
                
                {/* Action button */}
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#dc2626' }]}
                  onPress={() => onStartChat('prove-human', roastLevel)}
                >
                  <Text style={styles.actionButtonText}>START CHATTING</Text>
                  <Text style={styles.actionButtonIcon}>🛡️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* YouTube Live Stream Challenge Section */}
        <View style={styles.challengeSection}>
          <View style={styles.challengeGlow} />
          <View style={styles.challengeContent}>
            <View style={styles.challengeBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.challengeBadgeText}>🔴 LIVE CHALLENGE</Text>
            </View>
            
            <Text style={styles.challengeTitle}>BEAT ME ON YOUTUBE LIVE!</Text>
            
            <View style={styles.challengeBox}>
              <Text style={styles.challengeSubtitle}>🏆 THE ULTIMATE CHALLENGE 🏆</Text>
              <Text style={styles.challengeDesc}>
                Think you can outsmart our AI at the highest difficulty? Join our YouTube live streams and prove it!
              </Text>
              <View style={styles.challengeHighlight}>
                <Text style={styles.challengeHighlightTitle}>⚡ BEAT THE AI AT LEVEL 10 ⚡</Text>
                <Text style={styles.challengeHighlightDesc}>
                  Successfully convince our AI or prove your humanity at maximum difficulty during a live stream and win rewards!
                </Text>
              </View>
            </View>
            
            <View style={styles.rewardBox}>
              <Text style={styles.rewardTitle}>✨ GET REWARDED! ✨</Text>
              <Text style={styles.rewardDesc}>Winners receive exclusive rewards and recognition! 🎁</Text>
              
              <View style={styles.contactBox}>
                <Text style={styles.contactTitle}>📧 CLAIM YOUR REWARD:</Text>
                <View style={styles.emailBox}>
                  <Text style={styles.emailText}>alaotach@gmail.com</Text>
                </View>
                <Text style={styles.contactNote}>Contact us after your live stream victory to claim your reward!</Text>
              </View>
            </View>
          </View>        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  // Background Effects
  backgroundEffect1: {
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: 300,
    height: 300,
    backgroundColor: 'rgba(34, 211, 238, 0.05)',
    borderRadius: 150,
    opacity: 0.7,
  },
  backgroundEffect2: {
    position: 'absolute',
    bottom: '25%',
    right: '25%',
    width: 300,
    height: 300,
    backgroundColor: 'rgba(168, 85, 247, 0.05)',
    borderRadius: 150,
    opacity: 0.7,
  },
  backgroundEffect3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -200,
    marginTop: -200,
    width: 400,
    height: 400,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 200,
    opacity: 0.5,
  },
  backgroundEffect4: {
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: 150,
    height: 150,
    backgroundColor: 'rgba(236, 72, 153, 0.08)',
    borderRadius: 75,
    opacity: 0.6,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#22d3ee',
    borderRadius: 2,
    opacity: 0.3,  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexGrow: 1,
    minWidth: '100%',  },
  // Hero Section
  heroSection: {
    marginVertical: 30,
    alignItems: 'center',
    width: '100%',
  },
  heroGlow: {
    width: '100%',
    minWidth: 300,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  heroContent: {
    padding: 32,
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#22d3ee',
    textShadowColor: 'rgba(34, 211, 238, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  vsIcon: {
    marginHorizontal: 16,
    width: 40,
    height: 40,
    backgroundColor: '#22d3ee',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsIconText: {
    fontSize: 20,
    color: '#0f172a',
  },
  humanTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fb7185',
    textShadowColor: 'rgba(251, 113, 133, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
    marginHorizontal: 20,
    flexWrap: 'wrap',
  },
  description: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: 20,
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  featureShowcase: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    marginBottom: 24,
    width: '100%',
    maxWidth: 400,
  },
  featureIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  featureIconText: {
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  keyFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
  },
  keyFeature: {
    alignItems: 'center',
  },
  keyFeatureNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  keyFeatureLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  // Mode Selection
  modeContainer: {
    marginVertical: 40,
    gap: 32,
  },
  modeCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  convinceAiCard: {
    borderColor: 'rgba(34, 211, 238, 0.4)',
  },
  proveHumanCard: {
    borderColor: 'rgba(251, 113, 133, 0.4)',
  },
  modeCardGlow: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    borderRadius: 32,
    opacity: 0.5,
  },
  modeCardContent: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 24,
  },
  accentBar: {
    height: 4,
    width: '100%',
  },
  modeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 16,
  },
  modeIconContainer: {
    position: 'relative',
  },
  modeIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  modeIconText: {
    fontSize: 28,
  },
  modeOrbitDot1: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 16,
    height: 16,
    backgroundColor: '#22d3ee',
    borderRadius: 8,
  },
  modeOrbitDot2: {
    position: 'absolute',
    bottom: -8,
    left: -8,
    width: 12,
    height: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },
  statusIndicators: {
    flex: 1,
    marginLeft: 16,
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    flex: 1,
  },
  modeBody: {
    padding: 24,
    paddingTop: 8,
  },
  modeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  modeTitleUnderline: {
    width: 80,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modeDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  expectationBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.1)',
    marginBottom: 20,
  },
  expectationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  expectationList: {
    gap: 8,
  },
  expectationItem: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  featureGridItem: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    flex: 1,
    minWidth: '47%',
  },
  featureGridTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureGridDesc: {
    fontSize: 10,
    color: '#94a3b8',
    lineHeight: 14,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtonIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  
  // Challenge Section
  challengeSection: {
    marginVertical: 32,
    position: 'relative',
  },
  challengeGlow: {
    position: 'absolute',
    top: -16,
    left: -16,
    right: -16,
    bottom: -16,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 32,
    opacity: 0.8,
  },
  challengeContent: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.6)',
    alignItems: 'center',
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    marginBottom: 16,
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#dc2626',
    borderRadius: 4,
  },
  challengeBadgeText: {
    color: '#fbbf24',
    fontWeight: 'bold',
    fontSize: 12,
  },
  challengeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(251, 191, 36, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  challengeBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.2)',
    marginBottom: 20,
    width: '100%',
  },
  challengeSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  challengeDesc: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  challengeHighlight: {
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.3)',
  },
  challengeHighlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fca5a5',
    textAlign: 'center',
    marginBottom: 8,
  },
  challengeHighlightDesc: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  rewardBox: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.4)',
    width: '100%',
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    textAlign: 'center',
    marginBottom: 12,
  },
  rewardDesc: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.3)',
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22d3ee',
    marginBottom: 8,
  },
  emailBox: {
    backgroundColor: 'rgba(30, 41, 59, 1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.2)',
    marginBottom: 8,
  },
  emailText: {
    color: '#67e8f9',
    fontSize: 14,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  contactNote: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  // Status Footer
  statusFooter: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
    marginTop: 32,
    marginBottom: 20,
    gap: 12,
  },  
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  // Roast Level Section
  roastLevelSection: {
    marginHorizontal: 20,
    marginBottom: 32,
    // backgroundColor: 'rgba(15, 23, 42, 0.8)',
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: 'rgba(71, 85, 105, 0.3)',
  },
  roastLevelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },  
  roastLevelSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  // Mode Selection Section
  modeSelectionSection: {
    marginVertical: 6,
    alignItems: 'center',
  },
  modeSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  modeSectionSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  // Start Button
  startButtonContainer: {
    marginVertical: 32,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  startButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  startButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  startButtonLevel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
});
